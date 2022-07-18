import http from "../http-common";

class UploadFilesService {

    upload(file, onUploadProgress) {

        let formData = new FormData();
        formData.append("file", file);

        return http.post("/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress,
        });
    }

    getFiles() {
        return http.get("/files");
    }

    delete(file) {

        let fileId = file.url.substring(file.url.lastIndexOf('/' + 1));
        
        console.log("Trying to delete file with id: " + fileId);

        return http.delete(file.url);
    }
}

export default new UploadFilesService();