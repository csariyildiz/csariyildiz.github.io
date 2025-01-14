---
layout: post3
category: main
title: "A Sample App With Authentication"
cat: Research
tags:
  - Research
---




```
/login (public)
/dashboard (hidden)


/api/login

## 1. Key Generation

Client and Auth Server:
* Generate public and private key pairs using a strong cryptographic algorithm (e.g., RSA, ECDSA).

Client:
* Retains its private key securely.
 * Shares its public key with the Auth Server.

Auth Server:
* Retains its private key securely.
* Shares its public key with the Client.

## 2. Client Authentication Request

Client:
1.  Prepares credentials: `username` and `password`.
2.  Encrypts the `username` and `password` into `encrypted_username_password` using the Auth

Server's public key:
*`encrypted_username_password = encrypt(AuthServerPublicKey, username + password)`

3.  Sends a request to the Auth Server with the following data:
*   `encrypted_username_password`
*   `short_key` (a temporary shared key or unique identifier for this session).

## 3. Auth Server Validation

Auth Server:
1.  Rate-Limiting Check: If many concurrent requests are detected from the same IP, **ban the IP** and stop further processing.

2.  Short Key Verification:        
*   Validate the provided `short_key`.
*   If invalid:
 *   Quit.
 *   Ban the IP.

3.  Decryption and Credential Check:    
*   Decrypt `encrypted_username_password` using the server's **private key**:
*   `username + password = decrypt(AuthServerPrivateKey, encrypted_username_password)`
        *   Verify `username` and `password` against the database.

4. Credential Verification:
        
*   If invalid credentials:
            *   Quit.
            *   Ban the IP.
*   If credentials match:
            *   Proceed to token creation.


## 4. Token Creation

Auth Server:
*   Generates a secure token (e.g., JWT) with user details and expiration metadata.
*   Records the user's IP for auditing purposes.
*   Sends the token back to the Client.

## 5. Client Token Usage

Client:
*   Stores the received token securely (e.g., in memory or a secure storage mechanism).
*   Uses the token for subsequent API requests to the App.

6. Actual Application Authorization

App:
1. Receives API requests from the Client with the token in the `Authorization` header.
2. Validates the token (using the Auth Server’s public key for verification if JWT is used).
3. If the token is valid, processes the request.
4. If invalid, denies access.

```
