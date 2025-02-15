import type { DirectusPreset } from '../../../schema/preset.js';
import type { ApplyQueryFields, Query } from '../../../types/index.js';
import type { RestCommand } from '../../types.js';

export type UpdatePresetOutput<
	Schema extends object,
	TQuery extends Query<Schema, Item>,
	Item extends object = DirectusPreset<Schema>
> = ApplyQueryFields<Schema, Item, TQuery['fields']>;

/**
 * Update multiple existing presets.
 * @param keys
 * @param item
 * @param query
 * @returns Returns the preset objects for the updated presets.
 */
export const updatePresets =
	<Schema extends object, const TQuery extends Query<Schema, DirectusPreset<Schema>>>(
		keys: DirectusPreset<Schema>['id'][],
		item: Partial<DirectusPreset<Schema>>,
		query?: TQuery
	): RestCommand<UpdatePresetOutput<Schema, TQuery>[], Schema> =>
	() => ({
		path: `/presets`,
		params: query ?? {},
		body: JSON.stringify({ keys, data: item }),
		method: 'PATCH',
	});

/**
 * Update an existing preset.
 * @param key
 * @param item
 * @param query
 * @returns Returns the preset object for the updated preset.
 */
export const updatePreset =
	<Schema extends object, const TQuery extends Query<Schema, DirectusPreset<Schema>>>(
		key: DirectusPreset<Schema>['id'],
		item: Partial<DirectusPreset<Schema>>,
		query?: TQuery
	): RestCommand<UpdatePresetOutput<Schema, TQuery>, Schema> =>
	() => ({
		path: `/presets/${key}`,
		params: query ?? {},
		body: JSON.stringify(item),
		method: 'PATCH',
	});
