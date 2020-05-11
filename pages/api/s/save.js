// dependencies
import AWS from 'aws-sdk'
import shortid from 'shortid'

// get reference to S3 client
const s3 = new AWS.S3({
  accessKeyId: process.env.DND_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.DND_AWS_SECRET_ACCESS_KEY,
})
const S3_BUCKET = process.env.DND_S3_BUCKET

export default async (req, res) => {
  const { method } = req
  // if (method !== 'POST') {
  //   res.setHeader('Allow', ['POST'])
  //   res.status(405).end(`Method ${method} Not Allowed`)
  // }

  if (res.body) {
    console.debug('[api/s/save] body', res.body)
  }

  // res.status(200).json({ status: 'ok' })

  /*
  try {
    const result = await s3
      .upload({
        Bucket: S3_BUCKET,
        Key: `${shortid.generate()}.json`,
        Body: JSON.stringify({ hello: "world" }),
        ACL: "private",
        ContentEncoding: "utf8",
        ContentType: `application/json`,
      })
      .promise()

    return res.status(200).json(result)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
  */
};
