import { useState, useRef } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ImageIcon, Upload, Link as LinkIcon, X } from "lucide-react";

interface ImageUploadProps {
    value: string;
    onChange: (value: string) => void;
    className?: string;
    placeholder?: string;
}

export function ImageUpload({ value, onChange, className, placeholder = "Image URL..." }: ImageUploadProps) {
    const [tab, setTab] = useState<"url" | "file">("url");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === "string") {
                    onChange(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const clearImage = () => {
        onChange("");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className={`space-y-3 ${className}`}>
            <Tabs value={tab} onValueChange={(v) => setTab(v as "url" | "file")} className="w-full">
                <div className="flex items-center justify-between mb-2">
                    <Label>Image Source</Label>
                    <TabsList className="bg-zinc-800 h-8">
                        <TabsTrigger value="url" className="text-xs h-6 px-2">
                            <LinkIcon className="w-3 h-3 mr-1" /> URL
                        </TabsTrigger>
                        <TabsTrigger value="file" className="text-xs h-6 px-2">
                            <Upload className="w-3 h-3 mr-1" /> Upload
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="url" className="mt-0">
                    <div className="flex gap-2">
                        <Input
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            placeholder={placeholder}
                            className="bg-zinc-900 border-zinc-800"
                        />
                    </div>
                </TabsContent>

                <TabsContent value="file" className="mt-0">
                    <div className="flex gap-2">
                        <Input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="bg-zinc-900 border-zinc-800 cursor-pointer file:bg-zinc-800 file:text-zinc-200 file:border-0 file:rounded-md file:mr-4 file:px-2 file:text-sm"
                        />
                    </div>
                </TabsContent>
            </Tabs>

            {value && (
                <div className="relative rounded-lg overflow-hidden border border-zinc-800 bg-zinc-900/50 h-32 w-full flex items-center justify-center group">
                    <img
                        src={value}
                        alt="Preview"
                        className="h-full w-full object-contain"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={clearImage}
                            className="h-8"
                        >
                            <X className="w-4 h-4 mr-2" /> Remove
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
