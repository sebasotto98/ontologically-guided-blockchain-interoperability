/**
 * Hyperledger Cactus Plugin - Connector Fabric
 *
 * Can perform basic tasks on a fabric ledger
 *
 * The version of the OpenAPI document: 0.0.1
 * 
 *
 * Please note:
 * This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * Do not edit this file manually.
 */

@file:Suppress(
    "ArrayInDataClass",
    "EnumEntryName",
    "RemoveRedundantQualifierName",
    "UnusedImport"
)

package org.openapitools.client.models

import org.openapitools.client.models.DefaultEventHandlerStrategy

import com.squareup.moshi.Json

/**
 * 
 *
 * @param strategy 
 * @param commitTimeout 
 * @param endorseTimeout 
 */

data class GatewayEventHandlerOptions (

    @Json(name = "strategy")
    val strategy: DefaultEventHandlerStrategy,

    @Json(name = "commitTimeout")
    val commitTimeout: java.math.BigDecimal? = null,

    @Json(name = "endorseTimeout")
    val endorseTimeout: java.math.BigDecimal? = null

)

