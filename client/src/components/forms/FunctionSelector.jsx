import { Camera, Image, Film, X } from "lucide-react";

const functions = [
  "Engagement",
  "Haldi",
  "Mehendi",
  "Sangeet",
  "Wedding",
  "Reception",
  "Cocktail",
];

export default function FunctionSelector({ selected, onChange, mediaFiles = {}, onMediaChange }) {
  const toggle = (fn) => {
    if (selected.includes(fn)) {
      onChange(selected.filter((f) => f !== fn));
      if (onMediaChange) {
        onMediaChange(fn, []); // clear media if function is deselected
      }
    } else {
      onChange([...selected, fn]);
    }
  };

  const handleFileAdd = (fn, e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const currentFiles = mediaFiles[fn] || [];
    const newFiles = files.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
      name: file.name,
      type: file.type,
    }));

    if (onMediaChange) {
      onMediaChange(fn, [...currentFiles, ...newFiles]);
    }
  };

  const removeFile = (fn, indexToRemove) => {
    const currentFiles = mediaFiles[fn] || [];
    const updated = currentFiles.filter((_, idx) => idx !== indexToRemove);
    
    // Revoke the object URL to avoid memory leaks
    if (currentFiles[indexToRemove]?.previewUrl) {
      URL.revokeObjectURL(currentFiles[indexToRemove].previewUrl);
    }

    if (onMediaChange) {
      onMediaChange(fn, updated);
    }
  };

  return (
    <section className="rounded-lg bg-white p-5 shadow-sm border border-border-sage/40 sm:p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-accent">
          <Camera size={22} />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-heading font-marcellus tracking-wide">
            Wedding Functions
          </h2>

          <p className="mt-1 max-w-3xl text-sm font-light text-paragraphs">
            Select the functions to schedule. Upload reference photos & videos for each function.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {functions.map((item) => {
          const isSelected = selected.includes(item);
          const currentFiles = mediaFiles[item] || [];

          return (
            <div
              key={item}
              className={`group rounded-lg border p-4 transition-all duration-200 text-left flex flex-col justify-between ${
                isSelected
                  ? "border-accent bg-accent/5 shadow-sm"
                  : "border-border-sage/40 bg-white hover:border-accent/40 hover:bg-background/40"
              }`}
            >
              <div>
                {/* Header: Clickable to toggle checkbox */}
                <label className="flex items-center gap-3 cursor-pointer select-none pb-2">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggle(item)}
                    className="h-4.5 w-4.5 shrink-0 accent-accent cursor-pointer rounded"
                  />
                  <span className={`font-semibold text-sm ${isSelected ? "text-heading" : "text-paragraphs"}`}>
                    {item}
                  </span>
                </label>
              </div>

              {/* Upload section: only visible when selected */}
              {isSelected && (
                <div className="mt-3 pt-3 border-t border-border-sage/20 space-y-3">
                  <div className="flex items-center justify-between text-[10px] text-subtitle uppercase tracking-wider font-semibold">
                    <span>Reference Media</span>
                    <span>{currentFiles.length} item{currentFiles.length !== 1 ? "s" : ""}</span>
                  </div>

                  {/* Previews */}
                  {currentFiles.length > 0 && (
                    <div className="grid grid-cols-4 gap-2">
                      {currentFiles.map((fileObj, idx) => (
                        <div key={idx} className="relative aspect-square border border-border-sage/40 rounded overflow-hidden bg-preload flex items-center justify-center">
                          {fileObj.type.startsWith("video") ? (
                            <div className="w-full h-full flex flex-col items-center justify-center bg-heading text-background">
                              <Film size={16} className="text-accent" />
                              <span className="text-[7px] text-subtitle font-medium truncate w-full px-1 text-center mt-1">{fileObj.name}</span>
                              <span className="absolute top-0.5 left-0.5 text-[6px] bg-black/60 px-1 py-0.2 rounded text-white font-mono uppercase">Vid</span>
                            </div>
                          ) : (
                            <img
                              src={fileObj.previewUrl}
                              alt="preview"
                              className="w-full h-full object-cover"
                            />
                          )}
                          <button
                            type="button"
                            onClick={() => removeFile(item, idx)}
                            className="absolute -top-1 -right-1 bg-black/70 hover:bg-black/90 text-white rounded-full p-0.5 transition cursor-pointer"
                          >
                            <X size={8} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* File Inputs (hidden inputs, custom buttons) */}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => document.getElementById(`photo-upload-${item}`).click()}
                      className="flex-1 flex items-center justify-center gap-1.5 border border-dashed border-border-sage hover:border-accent hover:bg-accent/5 rounded py-2 px-1 text-center cursor-pointer transition text-heading"
                    >
                      <Image size={13} className="text-paragraphs" />
                      <span className="text-[9px] font-semibold uppercase tracking-wider">Add Photo</span>
                    </button>
                    <input
                      id={`photo-upload-${item}`}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(e) => handleFileAdd(item, e)}
                    />

                    <button
                      type="button"
                      onClick={() => document.getElementById(`video-upload-${item}`).click()}
                      className="flex-1 flex items-center justify-center gap-1.5 border border-dashed border-border-sage hover:border-accent hover:bg-accent/5 rounded py-2 px-1 text-center cursor-pointer transition text-heading"
                    >
                      <Film size={13} className="text-paragraphs" />
                      <span className="text-[9px] font-semibold uppercase tracking-wider">Add Video</span>
                    </button>
                    <input
                      id={`video-upload-${item}`}
                      type="file"
                      accept="video/*"
                      multiple
                      className="hidden"
                      onChange={(e) => handleFileAdd(item, e)}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
