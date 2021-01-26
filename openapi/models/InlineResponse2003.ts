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
    InlineResponse2001Topics,
    InlineResponse2001TopicsFromJSON,
    InlineResponse2001TopicsFromJSONTyped,
    InlineResponse2001TopicsToJSON,
} from './';

/**
 * 成功時
 * @export
 * @interface InlineResponse2003
 */
export interface InlineResponse2003 {
    /**
     * 
     * @type {Array<InlineResponse2001Topics>}
     * @memberof InlineResponse2003
     */
    topics?: Array<InlineResponse2001Topics>;
    /**
     * 
     * @type {number}
     * @memberof InlineResponse2003
     */
    page?: number;
    /**
     * 
     * @type {number}
     * @memberof InlineResponse2003
     */
    perPage?: number;
}

export function InlineResponse2003FromJSON(json: any): InlineResponse2003 {
    return InlineResponse2003FromJSONTyped(json, false);
}

export function InlineResponse2003FromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse2003 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'topics': !exists(json, 'topics') ? undefined : ((json['topics'] as Array<any>).map(InlineResponse2001TopicsFromJSON)),
        'page': !exists(json, 'page') ? undefined : json['page'],
        'perPage': !exists(json, 'perPage') ? undefined : json['perPage'],
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
        
        'topics': value.topics === undefined ? undefined : ((value.topics as Array<any>).map(InlineResponse2001TopicsToJSON)),
        'page': value.page,
        'perPage': value.perPage,
    };
}


