import stream from 'stream';

const streamResponse = (csv, res, fileName, mimeType) => {
  var fileContents = Buffer.from(csv);

  var readStream = new stream.PassThrough();
  readStream.end(fileContents);

  res.set('Content-disposition', 'attachment; filename=' + fileName);
  res.set('Content-Type', mimeType);

  readStream.pipe(res);
};

export default streamResponse;
