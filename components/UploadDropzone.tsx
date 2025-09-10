"use client";

import React from "react";
import { useDropzone, Accept } from "react-dropzone";
import type { CreateUploadDto } from "@/dto/upload/create-upload.dto";
import type { UploadResponseDto } from "@/dto/upload/upload-response.dto";
import { getUploadSas } from "@/api/upload/endpoints";

export type UploadedResult = {
  file: File;
  ok: boolean;
  error?: string;
  response?: UploadResponseDto;
};

type UploadDropzoneProps = {
  /** Allow multiple file selection */
  multiple?: boolean;
  /** react-dropzone accept prop (MIME(s) or extensions) */
  accept?: Accept;
  /** Max file size in bytes (e.g., 30 * 1024 * 1024) */
  maxSize?: number;
  /** Optional folder to prefix inside your container */
  folder?: string;
  /** Called when all selected files finish uploading */
  onComplete?: (results: UploadedResult[]) => void;
  /** Optional per-file callback when each upload finishes */
  onFileUploaded?: (result: UploadedResult) => void;
  /** Optional render override for the drop area */
  renderHint?: React.ReactNode;
  /** Optional className for container */
  className?: string;
};

type FileProgress = {
  progress: number; // 0..100
  status: "queued" | "signing" | "uploading" | "done" | "error" | "aborted";
  error?: string;
};

export default function UploadDropzone({
  multiple = true,
  accept,
  maxSize = 30 * 1024 * 1024,
  folder,
  onComplete,
  onFileUploaded,
  renderHint,
  className,
}: UploadDropzoneProps) {
  const [files, setFiles] = React.useState<File[]>([]);
  const [progressMap, setProgressMap] = React.useState<Record<string, FileProgress>>({});
  const abortControllers = React.useRef<Record<string, AbortController>>({});

  const onDrop = React.useCallback(
    async (acceptedFiles: File[], rejected: any[]) => {
      // Basic client-side filter using maxSize (react-dropzone also filters if provided)
      const permitted: File[] = [];
      const tooBig: File[] = [];

      for (const f of acceptedFiles) {
        if (f.size > maxSize) tooBig.push(f);
        else permitted.push(f);
      }

      // Initialize UI state
      setFiles((prev) => [...prev, ...permitted]);
      setProgressMap((prev) => {
        const next = { ...prev };
        for (const f of permitted) {
          next[f.name + f.size] = { progress: 0, status: "queued" };
        }
        for (const f of tooBig) {
          next[f.name + f.size] = { progress: 0, status: "error", error: "File exceeds size limit" };
        }
        return next;
      });

      // Kick off uploads sequentially (or in parallel if you prefer)
      const results: UploadedResult[] = [];
      for (const file of permitted) {
        const res = await uploadSingleFile(file);
        results.push(res);
        onFileUploaded?.(res);
      }
      if (results.length) onComplete?.(results);
    },
    [maxSize, folder, onComplete, onFileUploaded]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple,
    accept,
    maxSize,
    onDrop,
  });

  // Core: upload one file (get SAS → PUT with progress)
  const uploadSingleFile = async (file: File): Promise<UploadedResult> => {
    const key = file.name + file.size;
    try {
      // 1) Mark signing
      setProgressMap((m) => ({ ...m, [key]: { ...(m[key] ?? { progress: 0 }), status: "signing" } }));

      const dto: CreateUploadDto = {
        filename: file.name,
        contentType: file.type || "application/octet-stream",
        size: file.size,
        folder,
      };

      // 2) Ask backend for SAS
      const apiRes = await getUploadSas(dto); // your function returns ApiResponse<UploadResponseDto>
      // If your ApiResponse wraps data, adjust accordingly:
      const data: UploadResponseDto = (apiRes as any).data ?? (apiRes as any); // support both shapes

      // 3) PUT file with progress (XMLHttpRequest for progress events)
      setProgressMap((m) => ({ ...m, [key]: { ...(m[key] ?? { progress: 0 }), status: "uploading", progress: 0 } }));

      await putWithProgress(data.url, file, data.headers, (pct) => {
        setProgressMap((m) => ({ ...m, [key]: { ...(m[key] ?? { progress: 0 }), status: "uploading", progress: pct } }));
      }, abortControllers, key);

      setProgressMap((m) => ({ ...m, [key]: { ...(m[key] ?? { progress: 100 }), status: "done", progress: 100 } }));

      return { file, ok: true, response: data };
    } catch (err: any) {
      const message = err?.message || "Upload failed";
      setProgressMap((m) => ({ ...m, [key]: { ...(m[key] ?? { progress: 0 }), status: "error", error: message } }));
      return { file, ok: false, error: message };
    } finally {
      // cleanup abort controller for this key
      delete abortControllers.current[key];
    }
  };

  const handleAbort = (file: File) => {
    const key = file.name + file.size;
    const controller = abortControllers.current[key];
    if (controller) {
      controller.abort();
      setProgressMap((m) => ({ ...m, [key]: { ...(m[key] ?? { progress: 0 }), status: "aborted" } }));
      delete abortControllers.current[key];
    }
  };

  return (
    <div className={className}>
      <div
        {...getRootProps()}
        className={[
          "flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 transition",
          isDragActive ? "border-orange-400 bg-orange-50" : "border-slate-300 hover:bg-slate-50",
        ].join(" ")}
      >
        <input {...getInputProps()} />
        {renderHint ?? (
          <div className="text-center">
            <p className="text-base font-medium">Drag & drop files here, or click to select</p>
            {accept && <p className="mt-1 text-sm text-slate-500">Accepted: {formatAccept(accept)}</p>}
            <p className="mt-1 text-sm text-slate-500">Max size: {formatBytes(maxSize)}</p>
          </div>
        )}
      </div>

      {/* Progress List */}
      {files.length > 0 && (
        <div className="mt-4 space-y-3">
          {files.map((f) => {
            const k = f.name + f.size;
            const st = progressMap[k]?.status ?? "queued";
            const pct = progressMap[k]?.progress ?? 0;
            const err = progressMap[k]?.error;

            return (
              <div key={k} className="rounded-lg border p-3">
                <div className="flex items-center justify-between">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium">{f.name}</div>
                    <div className="text-xs text-slate-500">
                      {formatBytes(f.size)} • {f.type || "application/octet-stream"}
                    </div>
                  </div>
                  <div className="ml-3 text-xs">
                    {st === "queued" && <span className="text-slate-500">Queued</span>}
                    {st === "signing" && <span className="text-slate-500">Preparing…</span>}
                    {st === "uploading" && <span className="text-slate-500">{pct}%</span>}
                    {st === "done" && <span className="text-emerald-600">Done</span>}
                    {st === "error" && <span className="text-rose-600">Error</span>}
                    {st === "aborted" && <span className="text-amber-600">Cancelled</span>}
                  </div>
                </div>

                {/* Progress bar / error */}
                <div className="mt-2">
                  {st === "error" ? (
                    <div className="rounded-md bg-rose-50 p-2 text-sm text-rose-700">{err}</div>
                  ) : (
                    <div className="h-2 w-full rounded bg-slate-200">
                      <div
                        className="h-2 rounded bg-orange-500 transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  )}
                </div>

                <div className="mt-2 flex gap-2">
                  {st === "uploading" && (
                    <button
                      type="button"
                      onClick={() => handleAbort(f)}
                      className="rounded-md border px-2 py-1 text-xs hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/**
 * PUT with progress using XMLHttpRequest for browser
 */
function putWithProgress(
  url: string,
  file: File,
  headers: Record<string, string>,
  onProgress: (percent: number) => void,
  controllersRef: React.MutableRefObject<Record<string, AbortController>>,
  key: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const controller = new AbortController();
    controllersRef.current[key] = controller;

    xhr.upload.onprogress = (evt) => {
      if (evt.lengthComputable) {
        const pct = Math.round((evt.loaded / evt.total) * 100);
        onProgress(pct);
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) resolve();
      else reject(new Error(`Azure Blob responded ${xhr.status}: ${xhr.responseText || xhr.statusText}`));
    };

    xhr.onerror = () => reject(new Error("Network error"));
    xhr.onabort = () => reject(new Error("Aborted"));

    xhr.open("PUT", url);
    // Required Azure headers:
    xhr.setRequestHeader("x-ms-blob-type", headers["x-ms-blob-type"] || "BlockBlob");
    if (headers["Content-Type"]) xhr.setRequestHeader("Content-Type", headers["Content-Type"]);
    xhr.send(file);

    // Wire abort
    controller.signal.addEventListener("abort", () => {
      try {
        xhr.abort();
      } catch {}
    });
  });
}

function formatAccept(accept: UploadDropzoneProps["accept"]) {
  if (!accept) return "";
  if (Array.isArray(accept)) return accept.join(", ");
  // accept as object map
  return Object.entries(accept)
    .flatMap(([mime, exts]) => [mime, ...(Array.isArray(exts) ? exts : [])])
    .join(", ");
}

function formatBytes(bytes: number) {
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "0 B";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
}