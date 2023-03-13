const crypto = require("crypto");

function createHash(data) {
  return crypto.createHash("sha3-512").update(data).digest("hex");
}

function stringifyIfNotString(candidate) {
  if (typeof candidate !== "string") {
    candidate = JSON.stringify(candidate);
  }
  return candidate;
}

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  let candidate = TRIVIAL_PARTITION_KEY;
  if (event) {
    candidate = event.partitionKey || createHash(JSON.stringify(event));
  }

  candidate = stringifyIfNotString(candidate);

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = createHash(candidate);
  }

  return candidate;
};
