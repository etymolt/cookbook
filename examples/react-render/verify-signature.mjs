#!/usr/bin/env node
// Server-side: verify an EVP/1 verdict's Ed25519 detached signature.
//
// Pattern: canonicalize the verdict (without the signature fields) via RFC 8785
// JCS, then verify with tweetnacl using the public key fetched from
// /.well-known/evp-keys.json.

import { sign } from "tweetnacl";
import { decodeBase64 } from "tweetnacl-util";
import canonicalize from "canonicalize";

export async function verifyVerdict(verdict, jwksUrl = "https://api.etymolt.com/.well-known/evp-keys.json") {
  const { signature, signature_key_id, signature_payload_digest, ...payload } = verdict;
  const canonical = canonicalize(payload);
  const message = new TextEncoder().encode(canonical);

  const jwks = await (await fetch(jwksUrl)).json();
  const key = jwks.keys.find((k) => k.kid === signature_key_id);
  if (!key) throw new Error(`Unknown key id ${signature_key_id}`);

  const publicKey = decodeBase64(key.x);
  const sigBytes = decodeBase64(signature);

  return sign.detached.verify(message, sigBytes, publicKey);
}
