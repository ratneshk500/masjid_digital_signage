import dbConnect from "@/lib/mongodb";
import formidable from "formidable";
import fs from "fs";
import Media from "@/lib/models/Media";
import path from "path";
// pages/api/upload.ts




export const config = {
  api: {
    bodyParser: false, // we use formidable
  },
};

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    const form = formidable({ multiples: false, uploadDir: "public/uploads", keepExtensions: true });

    form.parse(req, async (err, fields, files) => {
      if (err) return res.status(500).json({ error: err });

      const file = files.file[0]; // get uploaded file
      const type = file.mimetype.startsWith("video") ? "video" : "image";
      const url = "/uploads/" + path.basename(file.filepath);

      const media = await Media.create({ type, url });

      res.status(201).json(media);
    });
  } else if (req.method === "GET") {
    //const media = await Media.find({});
	const media = await Media.find({}, "url type -_id");
	//console.log(media);
	
	const formatted = media.map(item => ({
  src: item.url,   // rename url → src
  type: item.type,
}));
	
	
	 //const media = {
      //  type: file.mimetype.startsWith("video") ? "video" : "image",
       // src: filePath,
      //};
	
    res.status(200).json(formatted);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
