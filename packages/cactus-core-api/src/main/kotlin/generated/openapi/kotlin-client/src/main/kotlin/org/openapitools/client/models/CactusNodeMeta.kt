/**
 *
 * Please note:
 * This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * Do not edit this file manually.
 *
 */

@file:Suppress(
    "ArrayInDataClass",
    "EnumEntryName",
    "RemoveRedundantQualifierName",
    "UnusedImport"
)

package org.openapitools.client.models


import com.squareup.moshi.Json

/**
 * A Cactus node meta information
 *
 * @param nodeApiHost 
 * @param publicKeyPem The PEM encoded public key that was used to generate the JWS included in the response (the jws property)
 */


data class CactusNodeMeta (

    @Json(name = "nodeApiHost")
    val nodeApiHost: kotlin.String,

    /* The PEM encoded public key that was used to generate the JWS included in the response (the jws property) */
    @Json(name = "publicKeyPem")
    val publicKeyPem: kotlin.String

)

