import { Knex } from "knex";
export class InvitationService {
    constructor(private knex: Knex) { }

    async inviteUser(projectId: number, userId: number, email: string) {

        const txn = await this.knex.transaction();

        try {
            const [check] = await txn("invitations")
                .update({
                    updated_at: new Date()
                })
                .where("user_id", userId)
                .where("email", email)
                .where("project_id", projectId)
                .returning('*')

            if (check) {
                return check
            }

            const [invitation] = await txn.insert({
                user_id: userId,
                project_id: projectId,
                email: email,
                status: 'pending',
            }).into('invitations').returning('*');

            await txn.commit();
            return invitation

        } catch (e) {
            await txn.rollback();
            throw e;
        }
    }

    async getInvitationList(projectId: number) {

        const txn = await this.knex.transaction();

        try {
            const invitationList = await txn.select("*")
                .from('invitations')
                .where("project_id", projectId)
                .orderBy('created_at', 'asc')

            await txn.commit();
            return invitationList

        } catch (e) {
            await txn.rollback();
            throw e;
        }
    }

    async deleteInvitation(invitationId: number, projectId:number) {

        const txn = await this.knex.transaction();

        try {
            await txn('invitations').del().where('id', invitationId)

            const invitationList = await txn.select("*")
                .from('invitations')
                .where("project_id", projectId)
                .orderBy('created_at', 'asc')

            await txn.commit();
            return invitationList

        } catch (e) {
            await txn.rollback();
            throw e;
        }
    }

    async acceptInvite(invitationId: number, projectId: number, userId: number) {

        const txn = await this.knex.transaction();

        try {
            const [member] = await txn('members').where("user_id", userId).where("project_id", projectId)
            const [invitation] = await txn('invitations').update({
                status: 'accepted'
            }).where('id', invitationId).returning('*')

            if (!member) {
                await txn('members').insert({
                    user_id: userId,
                    project_id: projectId,
                })
            }

            await txn.commit();
            return invitation
        } catch (e) {
            await txn.rollback();
            throw e;
        }
    }
}

