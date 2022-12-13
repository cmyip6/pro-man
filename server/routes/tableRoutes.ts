import express from "express";
import { tableController } from "../app";

 export const tableRoutes = () => {
    const tableRoutes = express.Router();

    tableRoutes.get('/:userID', tableController.getTable);
    tableRoutes.get('/favorite/:userID', tableController.getFavorite);
    tableRoutes.put('/updateTimeline', tableController.updateTimeline);
    tableRoutes.put('/updateDateline', tableController.updateDateline);
    tableRoutes.put('/updateItemGroupName', tableController.updateItemGroupName);
    tableRoutes.post('/insertItemGroup', tableController.insertItemGroup);

    return tableRoutes;
 }