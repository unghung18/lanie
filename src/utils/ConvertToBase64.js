function convertToBase64(e) {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    reader.onload = () => {
        return reader.result;
    }

    reader.onerror = (error) => {
        console.log("Error: ", error)
    }
}

export default convertToBase64;