package libraries

import (
	"bytes"
	"encoding/base64"
	"image/png"
	"io"
	"net/http"

	"github.com/corona10/goimagehash"
)

func ShapeFingerPrint(w http.ResponseWriter, r *http.Request) {
	b64, _ := io.ReadAll(r.Body)
	data, err := base64.StdEncoding.DecodeString(string(b64))
	if err != nil {
		http.Error(w, "bad base64", 400)
		return
	}
	img, err := png.Decode(bytes.NewReader(data))
	if err != nil {
		http.Error(w, "not png", 400)
		return
	}
	hash, _ := goimagehash.PerceptionHash(img)
	w.Write([]byte(hash.ToString()))
}
