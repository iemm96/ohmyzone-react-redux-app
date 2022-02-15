import Resizer from "react-image-file-resizer";

export const resizeImage = ( file:any ,maxWidth = 1400, maxHeight = 1000, format= "JPEG") => {
    let quality = 100;//4MB image file
    if (file.size > 4000000) {
        quality = 90;
    }//8MB image file
    if (file.size > 8000000) {
        quality = 85;
    }
    return new Promise((resolve) => {
        Resizer.imageFileResizer(
            file,
            maxWidth,
            maxHeight,
            format,
            quality,
            0,
            (uri) => {
                resolve(uri);
            },
            "blob"
        );
    });
};