import { Knex } from 'knex';

export class KanbanService {
	constructor(private knex: Knex) {}

	async getMemberInfo() {}

	async getKanbanInfo(project_id: number) {
		const kanbanDetail = await this.knex
			.select('projects.id as project_id')
			.from('states')
			.join('type_status', 'type_status.state_id', '=', 'states.id');

		return kanbanDetail;
	}
}
