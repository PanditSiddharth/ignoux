"use client";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { commands, ContextStore, ICommand, TextState } from "@uiw/react-md-editor";
import { ImageUpload } from "@/components/product/image-upload";
import { createRoot } from "react-dom/client";
import { ImageUpIcon } from "lucide-react";
import { cn } from "@/modals/utils";
import { useTheme } from "next-themes";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const modalContainerId = "image-upload-modal-container";

const imageUploadCommand: ICommand = {
  name: "imageUpload",
  keyCommand: "imageUpload",
  buttonProps: { "aria-label": "Insert Image" },
  icon: <ImageUpIcon className="w-4 h-4"/>,
  execute: (state: TextState, api) => {
    const showUploadModal = () => {
      return new Promise<string>((resolve) => {
        let modalDiv = document.getElementById(modalContainerId);

        if (!modalDiv) {
          modalDiv = document.createElement("div");
          modalDiv.id = modalContainerId;
          document.body.appendChild(modalDiv);
        }
        const root = createRoot(modalDiv);

        const closeModal = () => {
          root.unmount();
        };

        const handleImageSelect = (src: string) => {
          resolve(src);
          closeModal();
        };

        const Modal = () => (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            
          <div className="bg-white p-6 rounded shadow-lg"> 
               <h2 className="text-lg font-medium mb-4">Upload an Image</h2> 
              <ImageUpload onChange={handleImageSelect} />
               <button
                onClick={closeModal}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
              >
               Cancel
              </button>
           </div>
          </div>
        );

        root.render(<Modal />);
      });
    };

    showUploadModal().then((imageUrl) => {
      if (imageUrl) {
        const markdownImage = `![Image description](${imageUrl})\n`;
        api.replaceSelection(markdownImage);
      }
    });
  },
};

interface EditorOptions {
  className?: string;
  onChange: ((value?: string, event?: React.ChangeEvent<HTMLTextAreaElement>, state?: ContextStore) => void) | undefined
  value?: string;
}

function MyEditor({className, onChange, value}: EditorOptions) {
  const { theme, systemTheme } = useTheme()

  return (
    <div className={cn("w-full min-h-screen relative", className)} 
    data-color-mode={["dark", "blue"].includes((theme == "system" ? systemTheme : theme) as string) ? "dark" : "light"}>
      <MDEditor
        className="h-screen w-full relative"
        visibleDragbar={true}
        height="100%"
        value={value}
        onChange={onChange}
        commands={[
          ...(commands.getCommands().slice(0, -1)),
          // Add custom toolbar command
          imageUploadCommand,
        ]}
      />
    </div>
  );
}

export default MyEditor;
