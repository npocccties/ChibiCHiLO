/* tslint:disable */
/* eslint-disable */
/**
 * chibichilo-server
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 2.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface InlineResponse2005LtiLaunchBody
 */
export interface InlineResponse2005LtiLaunchBody {
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2005LtiLaunchBody
     */
    oauthVersion: string;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2005LtiLaunchBody
     */
    oauthNonce: string;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2005LtiLaunchBody
     */
    oauthTimestamp: string;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2005LtiLaunchBody
     */
    oauthConsumerKey: string;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2005LtiLaunchBody
     */
    oauthSignatureMethod: string;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2005LtiLaunchBody
     */
    oauthSignature: string;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2005LtiLaunchBody
     */
    ltiMessageType: string;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2005LtiLaunchBody
     */
    ltiVersion: string;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2005LtiLaunchBody
     */
    resourceLinkId: string;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2005LtiLaunchBody
     */
    userId: string;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2005LtiLaunchBody
     */
    roles: string;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2005LtiLaunchBody
     */
    contextId: string;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2005LtiLaunchBody
     */
    resourceLinkTitle?: string;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2005LtiLaunchBody
     */
    contextTitle?: string;
    /**
     * 
     * @type {string}
     * @memberof InlineResponse2005LtiLaunchBody
     */
    lisPersonNameFull?: string;
}

export function InlineResponse2005LtiLaunchBodyFromJSON(json: any): InlineResponse2005LtiLaunchBody {
    return InlineResponse2005LtiLaunchBodyFromJSONTyped(json, false);
}

export function InlineResponse2005LtiLaunchBodyFromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse2005LtiLaunchBody {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'oauthVersion': json['oauth_version'],
        'oauthNonce': json['oauth_nonce'],
        'oauthTimestamp': json['oauth_timestamp'],
        'oauthConsumerKey': json['oauth_consumer_key'],
        'oauthSignatureMethod': json['oauth_signature_method'],
        'oauthSignature': json['oauth_signature'],
        'ltiMessageType': json['lti_message_type'],
        'ltiVersion': json['lti_version'],
        'resourceLinkId': json['resource_link_id'],
        'userId': json['user_id'],
        'roles': json['roles'],
        'contextId': json['context_id'],
        'resourceLinkTitle': !exists(json, 'resource_link_title') ? undefined : json['resource_link_title'],
        'contextTitle': !exists(json, 'context_title') ? undefined : json['context_title'],
        'lisPersonNameFull': !exists(json, 'lis_person_name_full') ? undefined : json['lis_person_name_full'],
    };
}

export function InlineResponse2005LtiLaunchBodyToJSON(value?: InlineResponse2005LtiLaunchBody | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'oauth_version': value.oauthVersion,
        'oauth_nonce': value.oauthNonce,
        'oauth_timestamp': value.oauthTimestamp,
        'oauth_consumer_key': value.oauthConsumerKey,
        'oauth_signature_method': value.oauthSignatureMethod,
        'oauth_signature': value.oauthSignature,
        'lti_message_type': value.ltiMessageType,
        'lti_version': value.ltiVersion,
        'resource_link_id': value.resourceLinkId,
        'user_id': value.userId,
        'roles': value.roles,
        'context_id': value.contextId,
        'resource_link_title': value.resourceLinkTitle,
        'context_title': value.contextTitle,
        'lis_person_name_full': value.lisPersonNameFull,
    };
}


