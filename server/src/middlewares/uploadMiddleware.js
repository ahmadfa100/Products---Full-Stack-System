import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },

  filename:(req,file,cb)=>{
    const uniqueName = Data.now() + '-' + Math.random(Math.random()*1e9);
    const ext = path.extname(file.originalname);

    cb(null,uniqueName,ext);
  }

});

const fileFilter=(req,file,cb)=>{
    if(file.mimetype.startWith("image/")){
        cb(null,true);
    }else{
        cb(new Error("Only image files are allowed"),false)
    }
}

const upload = multer({
  storage,
  fileFilter,
});

export default upload;