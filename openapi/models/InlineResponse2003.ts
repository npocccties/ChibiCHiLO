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
import {
    InlineResponse2003LtiLaunchBody,
    InlineResponse2003LtiLaunchBodyFromJSON,
    InlineResponse2003LtiLaunchBodyFromJSONTyped,
    InlineResponse2003LtiLaunchBodyToJSON,
    InlineResponse2003User,
    InlineResponse2003UserFromJSON,
    InlineResponse2003UserFromJSONTyped,
    InlineResponse2003UserToJSON,
} from './';

/**
 * セッション情報
 * @export
 * @interface InlineResponse2003
 */
export interface InlineResponse2003 {
    /**
     * 
     * @type {InlineResponse2003LtiLaunchBody}
     * @memberof InlineResponse2003
     */
    ltiLaunchBody?: InlineResponse2003LtiLaunchBody;
    /**
     * 
     * @type {InlineResponse2003User}
     * @memberof InlineResponse2003
     */
    user?: InlineResponse2003User;
}

export function InlineResponse2003FromJSON(json: any): InlineResponse2003 {
    return InlineResponse2003FromJSONTyped(json, false);
}

export function InlineResponse2003FromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse2003 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'ltiLaunchBody': !exists(json, 'ltiLaunchBody') ? undefined : InlineResponse2003LtiLaunchBodyFromJSON(json['ltiLaunchBody']),
        'user': !exists(json, 'user') ? undefined : InlineResponse2003UserFromJSON(json['user']),
    };
}

export function InlineResponse2003ToJSON(value?: InlineResponse2003 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'ltiLaunchBody': InlineResponse2003LtiLaunchBodyToJSON(value.ltiLaunchBody),
        'user': InlineResponse2003UserToJSON(value.user),
    };
}

