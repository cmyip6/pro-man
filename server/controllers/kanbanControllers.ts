import { Request, Response } from 'express';
import { KanbanService } from '../services/KanbanService';

export class KanbanController {
	constructor(private kanbanService: KanbanService) {}

	getKanban = async (req: Request, res: Response) => {
		try {
			const projectId = req.params.projectId;

			const result = await this.kanbanService.getKanbanInfo(
				Number(projectId)
			);

			res.json({
				success: true,
				projectInfo: result
			});

		} catch (e) {
			console.error(e);
			res.status(500).json({ msg: '[KAN] Fail to Get Data.' });
		}
	};

	getMemberList = async(req: Request, res: Response) => {
		try { 
			const projectId = req.params.projectId;

			const result = await this.kanbanService.getMemberList(
				Number(projectId)
			);

			res.json({
				success: true,
				memberList: result
			});

		} catch (e) {
			console.error(e);
			res.status(500).json({ msg: '[KAN] Fail to Get Member List Data.' });
		}
	};

	getGroupList = async (req: Request, res: Response) => {
		try {
			const projectId = req.params.projectId;

			const result = await this.kanbanService.getGroupList(
				Number(projectId)
			);

			res.json({
				success: true,
				groupList: result
			});


		} catch (e) {
			console.error(e);
			res.status(500).json({ msg: '[KAN] Fail to Get Group List Data.'});
		}
	}

	postKanban = async (req: Request, res: Response) => {
		try {
			const { projectId, itemName,groupId, date, userId, } = req.body;
			await this.kanbanService.addKanbanitem( projectId, itemName, groupId, date, userId );

            res.json({
                success: true, 
            })
		} catch (e) {
			console.error(e);
			res.status(500).json({ msg: '[KAN] Fail to Post Data.' });
		}
	};
}
