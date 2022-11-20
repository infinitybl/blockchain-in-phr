import { create } from "ipfs-http-client";

// connect using a URL
const ipfsClient = create(new URL("http://localhost:5001"));

export default ipfsClient;
