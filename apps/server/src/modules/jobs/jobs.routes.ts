import { Router } from "express";
import { JobsController } from "./jobs.controller";
import { JobsService } from "./jobs.service";
import { JobsProcessor } from "./jobs.processor";
import { UrlChecker } from "./url-checker";
import { InMemoryJobsRepository } from "../../infra/storage/in-memory-job.repository";

const repository = new InMemoryJobsRepository();

const urlChecker = new UrlChecker();

const processor = new JobsProcessor(
    repository,
    urlChecker
);

const service = new JobsService(
    repository,
    processor
);

const controller = new JobsController(service);

export const jobsRouter = Router();

jobsRouter.post(
    '/',
    controller.create,
);

jobsRouter.get(
    '/',
    controller.getAll
);

jobsRouter.get(
    '/:id',
    controller.getById
);

jobsRouter.delete(
    '/:id',
    controller.cancel
)