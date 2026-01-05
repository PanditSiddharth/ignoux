export const downloadLink = async (fileLink: string) => {
    try {
        const response = await fetch(fileLink + "");
       
        if (!response.ok) throw new Error("Failed to fetch file");
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        const name = (fileLink + "")?.split("/").pop()
        link.download = name + ""; // Set the desired file name here
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error("Download failed:", error);
    }
}