const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");

const stub = ClarifaiStub.grpc();

const metadata = new grpc.Metadata();
metadata.set("authorization", `Key ${process.env.CLARIFAI_KEY}`);

const handleApiCall = (req, res) => {
  stub.PostModelOutputs(
    {
      model_id: "face-detection",
      inputs: [{ data: { image: { url: req.body.input } } }],
    },
    metadata,
    (err, response) => {
      if (err) {
        // console.log("Error: " + err);
        return res.status(400).json("unable to work with API");
      }

      if (response.status.code !== 10000) {
        // console.log(
        //   "Received failed status: " +
        //     response.status.description +
        //     "\n" +
        //     response.status.details
        // );
        return res.status(400).json("unable to work with API");
      }

      // console.log("Predicted concepts, with confidence values:");
      for (const c of response.outputs[0].data.concepts) {
        console.log(c.name + ": " + c.value);
      }
      return res.json(response);
    }
  );
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0].entries);
    })
    .catch((err) => res.status(400).json("unable to get entries"));
};

module.exports = {
  handleImage,
  handleApiCall,
};
