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
 * 
 *
 * @param key The key for the entry to check the presence of on the keychain.
 */


data class DeleteKeychainEntryRequestV1 (

    /* The key for the entry to check the presence of on the keychain. */
    @Json(name = "key")
    val key: kotlin.String

)

