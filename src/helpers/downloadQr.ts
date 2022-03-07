export const downloadQr = ( idElement:string, fileName?:string ) => {
    const svg:any = document.getElementById( idElement );
    if( !svg ) {
        return;
    }
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx:any = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      if( ctx ) {
        ctx.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = fileName ? fileName : idElement;
        downloadLink.href = `${pngFile}`;
        downloadLink.click();
      }
      
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };