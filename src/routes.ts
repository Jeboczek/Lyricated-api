/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { Controller, ValidationService, FieldErrors, ValidateError, TsoaRoute, HttpStatusCodeLiteral, TsoaResponse, fetchMiddlewares } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CurseController } from './controllers/curseController/curseController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { EpisodeController } from './controllers/episodeController/episodeController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { LangController } from './controllers/langController/langController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { LyricController } from './controllers/lyricController/lyricController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { LyricSentenceController } from './controllers/lyricSentenceController/lyricSentenceController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { MovieController } from './controllers/movieController/movieController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { MovieNameController } from './controllers/movieNameController/movieNameController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { SearchController } from './controllers/searchController/searchController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { SecurityController } from './controllers/securityController/securityController';
import { expressAuthentication } from './services/securityService/expressAuthentication/expressAuthentication';
// @ts-ignore - no great way to install types from subpackage
const promiseAny = require('promise.any');
import type { RequestHandler } from 'express';
import * as express from 'express';

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "CurseResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "content": {"dataType":"string","required":true},
            "lang": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PostCurseRequest": {
        "dataType": "refObject",
        "properties": {
            "lang": {"dataType":"string","required":true},
            "content": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ErrorResponse": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "message": {"dataType":"string","required":true},
            "errorUUID": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PutCurseRequest": {
        "dataType": "refObject",
        "properties": {
            "lang": {"dataType":"string","required":true},
            "content": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EpisodeResponse": {
        "dataType": "refObject",
        "properties": {
            "episode_id": {"dataType":"double","required":true},
            "season": {"dataType":"double","required":true},
            "episode": {"dataType":"double","required":true},
            "netflix_id": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PostEpisodeRequest": {
        "dataType": "refObject",
        "properties": {
            "episode": {"dataType":"double","required":true},
            "season": {"dataType":"double","required":true},
            "netflixId": {"dataType":"double","required":true},
            "movieId": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PutEpisodeRequest": {
        "dataType": "refObject",
        "properties": {
            "episode": {"dataType":"double","required":true},
            "season": {"dataType":"double","required":true},
            "netflixId": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PostLangRequest": {
        "dataType": "refObject",
        "properties": {
            "lang": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MovieNameResponse": {
        "dataType": "refObject",
        "properties": {
            "movie_name_id": {"dataType":"double","required":true},
            "lang": {"dataType":"string","required":true},
            "content": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MovieResponse": {
        "dataType": "refObject",
        "properties": {
            "movie_id": {"dataType":"double","required":true},
            "lang": {"dataType":"string","required":true},
            "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["movie"]},{"dataType":"enum","enums":["serie"]}],"required":true},
            "netflix_id": {"dataType":"double"},
            "minutes": {"dataType":"double","required":true},
            "movie_names": {"dataType":"array","array":{"dataType":"refObject","ref":"MovieNameResponse"},"required":true},
            "episodes": {"dataType":"array","array":{"dataType":"refObject","ref":"EpisodeResponse"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LyricSentenceResponse": {
        "dataType": "refObject",
        "properties": {
            "sentence_id": {"dataType":"double","required":true},
            "lang": {"dataType":"string","required":true},
            "content": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LyricResponse": {
        "dataType": "refObject",
        "properties": {
            "lyric_id": {"dataType":"double","required":true},
            "movie": {"ref":"MovieResponse","required":true},
            "episode": {"dataType":"union","subSchemas":[{"ref":"EpisodeResponse"},{"dataType":"enum","enums":[null]}],"required":true},
            "seconds": {"dataType":"double","required":true},
            "quality": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}],"required":true},
            "sentences": {"dataType":"array","array":{"dataType":"refObject","ref":"LyricSentenceResponse"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PostLyricRequest": {
        "dataType": "refObject",
        "properties": {
            "seconds": {"dataType":"double","required":true},
            "movieId": {"dataType":"double","required":true},
            "quality": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}],"required":true},
            "episodeId": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PutLyricRequest": {
        "dataType": "refObject",
        "properties": {
            "seconds": {"dataType":"double","required":true},
            "movieId": {"dataType":"double","required":true},
            "quality": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}],"required":true},
            "episodeId": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PostLyricSentenceRequest": {
        "dataType": "refObject",
        "properties": {
            "lyric_id": {"dataType":"double","required":true},
            "lang": {"dataType":"string","required":true},
            "content": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PutLyricSentenceRequest": {
        "dataType": "refObject",
        "properties": {
            "lang": {"dataType":"string","required":true},
            "content": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MovieType": {
        "dataType": "refEnum",
        "enums": ["only_movies","only_series"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PostMovieRequest": {
        "dataType": "refObject",
        "properties": {
            "lang": {"dataType":"string","required":true},
            "netflix_id": {"dataType":"double"},
            "minutes": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PutMovieRequest": {
        "dataType": "refObject",
        "properties": {
            "lang": {"dataType":"string","required":true},
            "netflix_id": {"dataType":"double","required":true},
            "minutes": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PostMovieNameRequest": {
        "dataType": "refObject",
        "properties": {
            "lang": {"dataType":"string","required":true},
            "content": {"dataType":"string","required":true},
            "movieId": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PutMovieNameRequest": {
        "dataType": "refObject",
        "properties": {
            "lang": {"dataType":"string","required":true},
            "content": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "HighlightResponse": {
        "dataType": "refObject",
        "properties": {
            "from": {"dataType":"double","required":true},
            "to": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SearchResultResponse": {
        "dataType": "refObject",
        "properties": {
            "lyric": {"ref":"LyricResponse","required":true},
            "from_sentence": {"ref":"LyricSentenceResponse","required":true},
            "to_sentence": {"ref":"LyricSentenceResponse","required":true},
            "from_highlights": {"dataType":"array","array":{"dataType":"refObject","ref":"HighlightResponse"},"required":true},
            "to_highlights": {"dataType":"array","array":{"dataType":"refObject","ref":"HighlightResponse"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "HandlerTimeResponse": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "time": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SearchResponse": {
        "dataType": "refObject",
        "properties": {
            "from_lang_id": {"dataType":"string","required":true},
            "to_lang_id": {"dataType":"string","required":true},
            "search_phase": {"dataType":"string","required":true},
            "translations": {"dataType":"array","array":{"dataType":"string"},"required":true},
            "main_results": {"dataType":"array","array":{"dataType":"refObject","ref":"SearchResultResponse"},"required":true},
            "similar_results": {"dataType":"array","array":{"dataType":"refObject","ref":"SearchResultResponse"},"required":true},
            "handlers_time": {"dataType":"array","array":{"dataType":"refObject","ref":"HandlerTimeResponse"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SearchRequestFilterOptions": {
        "dataType": "refObject",
        "properties": {
            "hide_curses": {"dataType":"boolean"},
            "hide_movies": {"dataType":"boolean"},
            "hide_series": {"dataType":"boolean"},
            "only_movie_id": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SortingMode": {
        "dataType": "refEnum",
        "enums": ["shortest","best_match","longest"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SearchRequest": {
        "dataType": "refObject",
        "properties": {
            "search_phase": {"dataType":"string","required":true},
            "from_lang_id": {"dataType":"string","required":true},
            "to_lang_id": {"dataType":"string","required":true},
            "filter_options": {"ref":"SearchRequestFilterOptions","required":true},
            "sorting_mode": {"ref":"SortingMode","required":true},
            "dont_use_cache": {"dataType":"boolean","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PermissionResponse": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "KeyResponse": {
        "dataType": "refObject",
        "properties": {
            "key": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "permissions": {"dataType":"array","array":{"dataType":"refObject","ref":"PermissionResponse"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PostKeyRequest": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: express.Router) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
        app.post('/curse/add',
            authenticateMiddleware([{"api_key":["contributor"]}]),
            ...(fetchMiddlewares<RequestHandler>(CurseController)),
            ...(fetchMiddlewares<RequestHandler>(CurseController.prototype.postCurse)),

            function CurseController_postCurse(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"body","name":"request","required":true,"ref":"PostCurseRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new CurseController();


              const promise = controller.postCurse.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/curse/find',
            authenticateMiddleware([{"api_key":["client"]}]),
            ...(fetchMiddlewares<RequestHandler>(CurseController)),
            ...(fetchMiddlewares<RequestHandler>(CurseController.prototype.getCurses)),

            function CurseController_getCurses(request: any, response: any, next: any) {
            const args = {
                    onlyLang: {"in":"query","name":"only_lang","dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new CurseController();


              const promise = controller.getCurses.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/curse/:id',
            authenticateMiddleware([{"api_key":["client"]}]),
            ...(fetchMiddlewares<RequestHandler>(CurseController)),
            ...(fetchMiddlewares<RequestHandler>(CurseController.prototype.getCurse)),

            function CurseController_getCurse(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new CurseController();


              const promise = controller.getCurse.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/curse/:id',
            authenticateMiddleware([{"api_key":["contributor"]}]),
            ...(fetchMiddlewares<RequestHandler>(CurseController)),
            ...(fetchMiddlewares<RequestHandler>(CurseController.prototype.putCurse)),

            function CurseController_putCurse(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
                    request: {"in":"body","name":"request","required":true,"ref":"PutCurseRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new CurseController();


              const promise = controller.putCurse.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/curse/:id',
            authenticateMiddleware([{"api_key":["contributor"]}]),
            ...(fetchMiddlewares<RequestHandler>(CurseController)),
            ...(fetchMiddlewares<RequestHandler>(CurseController.prototype.deleteCurse)),

            function CurseController_deleteCurse(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new CurseController();


              const promise = controller.deleteCurse.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/episode/new',
            authenticateMiddleware([{"api_key":["contributor"]}]),
            ...(fetchMiddlewares<RequestHandler>(EpisodeController)),
            ...(fetchMiddlewares<RequestHandler>(EpisodeController.prototype.postEpisode)),

            function EpisodeController_postEpisode(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"body","name":"request","required":true,"ref":"PostEpisodeRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new EpisodeController();


              const promise = controller.postEpisode.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/episode/:id',
            authenticateMiddleware([{"api_key":["client"]}]),
            ...(fetchMiddlewares<RequestHandler>(EpisodeController)),
            ...(fetchMiddlewares<RequestHandler>(EpisodeController.prototype.getEpisode)),

            function EpisodeController_getEpisode(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new EpisodeController();


              const promise = controller.getEpisode.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/episode/:id',
            authenticateMiddleware([{"api_key":["contributor"]}]),
            ...(fetchMiddlewares<RequestHandler>(EpisodeController)),
            ...(fetchMiddlewares<RequestHandler>(EpisodeController.prototype.putEpisode)),

            function EpisodeController_putEpisode(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
                    request: {"in":"body","name":"request","required":true,"ref":"PutEpisodeRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new EpisodeController();


              const promise = controller.putEpisode.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/episode/:id',
            authenticateMiddleware([{"api_key":["contributor"]}]),
            ...(fetchMiddlewares<RequestHandler>(EpisodeController)),
            ...(fetchMiddlewares<RequestHandler>(EpisodeController.prototype.deleteEpisode)),

            function EpisodeController_deleteEpisode(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new EpisodeController();


              const promise = controller.deleteEpisode.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/lang/new',
            authenticateMiddleware([{"api_key":["contributor"]}]),
            ...(fetchMiddlewares<RequestHandler>(LangController)),
            ...(fetchMiddlewares<RequestHandler>(LangController.prototype.postLang)),

            function LangController_postLang(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"body","name":"request","required":true,"ref":"PostLangRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new LangController();


              const promise = controller.postLang.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/lang/all',
            authenticateMiddleware([{"api_key":["client"]}]),
            ...(fetchMiddlewares<RequestHandler>(LangController)),
            ...(fetchMiddlewares<RequestHandler>(LangController.prototype.getLangs)),

            function LangController_getLangs(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new LangController();


              const promise = controller.getLangs.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/lang/:lang',
            authenticateMiddleware([{"api_key":["contributor"]}]),
            ...(fetchMiddlewares<RequestHandler>(LangController)),
            ...(fetchMiddlewares<RequestHandler>(LangController.prototype.deleteLang)),

            function LangController_deleteLang(request: any, response: any, next: any) {
            const args = {
                    lang: {"in":"path","name":"lang","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new LangController();


              const promise = controller.deleteLang.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/lyric/new',
            authenticateMiddleware([{"api_key":["contributor"]}]),
            ...(fetchMiddlewares<RequestHandler>(LyricController)),
            ...(fetchMiddlewares<RequestHandler>(LyricController.prototype.createLyric)),

            function LyricController_createLyric(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"body","name":"request","required":true,"ref":"PostLyricRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new LyricController();


              const promise = controller.createLyric.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/lyric/without-quality',
            authenticateMiddleware([{"api_key":["client"]}]),
            ...(fetchMiddlewares<RequestHandler>(LyricController)),
            ...(fetchMiddlewares<RequestHandler>(LyricController.prototype.getLyricWithoutQuality)),

            function LyricController_getLyricWithoutQuality(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new LyricController();


              const promise = controller.getLyricWithoutQuality.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/lyric/random',
            authenticateMiddleware([{"api_key":["client"]}]),
            ...(fetchMiddlewares<RequestHandler>(LyricController)),
            ...(fetchMiddlewares<RequestHandler>(LyricController.prototype.getRandomLyric)),

            function LyricController_getRandomLyric(request: any, response: any, next: any) {
            const args = {
                    qualityBetterThan: {"in":"query","name":"qualityBetterThan","dataType":"double"},
                    qualityLowerThan: {"in":"query","name":"qualityLowerThan","dataType":"double"},
                    qualityEqual: {"in":"query","name":"qualityEqual","dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new LyricController();


              const promise = controller.getRandomLyric.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/lyric/:id',
            authenticateMiddleware([{"api_key":["client"]}]),
            ...(fetchMiddlewares<RequestHandler>(LyricController)),
            ...(fetchMiddlewares<RequestHandler>(LyricController.prototype.getLyricById)),

            function LyricController_getLyricById(request: any, response: any, next: any) {
            const args = {
                    lyricId: {"in":"path","name":"id","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new LyricController();


              const promise = controller.getLyricById.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/lyric/:id',
            authenticateMiddleware([{"api_key":["contributor"]}]),
            ...(fetchMiddlewares<RequestHandler>(LyricController)),
            ...(fetchMiddlewares<RequestHandler>(LyricController.prototype.putLyric)),

            function LyricController_putLyric(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
                    request: {"in":"body","name":"request","required":true,"ref":"PutLyricRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new LyricController();


              const promise = controller.putLyric.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/lyric/:id',
            authenticateMiddleware([{"api_key":["contributor"]}]),
            ...(fetchMiddlewares<RequestHandler>(LyricController)),
            ...(fetchMiddlewares<RequestHandler>(LyricController.prototype.deleteLyric)),

            function LyricController_deleteLyric(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new LyricController();


              const promise = controller.deleteLyric.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/lyric-sentence/new',
            authenticateMiddleware([{"api_key":["contributor"]}]),
            ...(fetchMiddlewares<RequestHandler>(LyricSentenceController)),
            ...(fetchMiddlewares<RequestHandler>(LyricSentenceController.prototype.createLyricSentence)),

            function LyricSentenceController_createLyricSentence(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"body","name":"request","required":true,"ref":"PostLyricSentenceRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new LyricSentenceController();


              const promise = controller.createLyricSentence.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/lyric-sentence/:id',
            authenticateMiddleware([{"api_key":["client"]}]),
            ...(fetchMiddlewares<RequestHandler>(LyricSentenceController)),
            ...(fetchMiddlewares<RequestHandler>(LyricSentenceController.prototype.getLyricSentence)),

            function LyricSentenceController_getLyricSentence(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new LyricSentenceController();


              const promise = controller.getLyricSentence.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/lyric-sentence/:id',
            authenticateMiddleware([{"api_key":["contributor"]}]),
            ...(fetchMiddlewares<RequestHandler>(LyricSentenceController)),
            ...(fetchMiddlewares<RequestHandler>(LyricSentenceController.prototype.putLyricSentence)),

            function LyricSentenceController_putLyricSentence(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
                    request: {"in":"body","name":"request","required":true,"ref":"PutLyricSentenceRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new LyricSentenceController();


              const promise = controller.putLyricSentence.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/lyric-sentence/:id',
            authenticateMiddleware([{"api_key":["contributor"]}]),
            ...(fetchMiddlewares<RequestHandler>(LyricSentenceController)),
            ...(fetchMiddlewares<RequestHandler>(LyricSentenceController.prototype.deleteMovie)),

            function LyricSentenceController_deleteMovie(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new LyricSentenceController();


              const promise = controller.deleteMovie.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/movie/find',
            authenticateMiddleware([{"api_key":["client"]}]),
            ...(fetchMiddlewares<RequestHandler>(MovieController)),
            ...(fetchMiddlewares<RequestHandler>(MovieController.prototype.getMovies)),

            function MovieController_getMovies(request: any, response: any, next: any) {
            const args = {
                    type: {"in":"query","name":"type","ref":"MovieType"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new MovieController();


              const promise = controller.getMovies.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/movie/new',
            authenticateMiddleware([{"api_key":["contributor"]}]),
            ...(fetchMiddlewares<RequestHandler>(MovieController)),
            ...(fetchMiddlewares<RequestHandler>(MovieController.prototype.createMovie)),

            function MovieController_createMovie(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"body","name":"request","required":true,"ref":"PostMovieRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new MovieController();


              const promise = controller.createMovie.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/movie/:id',
            authenticateMiddleware([{"api_key":["client"]}]),
            ...(fetchMiddlewares<RequestHandler>(MovieController)),
            ...(fetchMiddlewares<RequestHandler>(MovieController.prototype.getMovie)),

            function MovieController_getMovie(request: any, response: any, next: any) {
            const args = {
                    movieId: {"in":"path","name":"id","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new MovieController();


              const promise = controller.getMovie.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/movie/:id',
            authenticateMiddleware([{"api_key":["contributor"]}]),
            ...(fetchMiddlewares<RequestHandler>(MovieController)),
            ...(fetchMiddlewares<RequestHandler>(MovieController.prototype.putMovie)),

            function MovieController_putMovie(request: any, response: any, next: any) {
            const args = {
                    movieId: {"in":"path","name":"id","required":true,"dataType":"double"},
                    request: {"in":"body","name":"request","required":true,"ref":"PutMovieRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new MovieController();


              const promise = controller.putMovie.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/movie/:id',
            authenticateMiddleware([{"api_key":["contributor"]}]),
            ...(fetchMiddlewares<RequestHandler>(MovieController)),
            ...(fetchMiddlewares<RequestHandler>(MovieController.prototype.deleteMovie)),

            function MovieController_deleteMovie(request: any, response: any, next: any) {
            const args = {
                    movieId: {"in":"path","name":"id","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new MovieController();


              const promise = controller.deleteMovie.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/movie-name/new',
            authenticateMiddleware([{"api_key":["contributor"]}]),
            ...(fetchMiddlewares<RequestHandler>(MovieNameController)),
            ...(fetchMiddlewares<RequestHandler>(MovieNameController.prototype.postMovieName)),

            function MovieNameController_postMovieName(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"body","name":"request","required":true,"ref":"PostMovieNameRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new MovieNameController();


              const promise = controller.postMovieName.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/movie-name/:id',
            authenticateMiddleware([{"api_key":["client"]}]),
            ...(fetchMiddlewares<RequestHandler>(MovieNameController)),
            ...(fetchMiddlewares<RequestHandler>(MovieNameController.prototype.getMovieName)),

            function MovieNameController_getMovieName(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new MovieNameController();


              const promise = controller.getMovieName.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/movie-name/:id',
            authenticateMiddleware([{"api_key":["contributor"]}]),
            ...(fetchMiddlewares<RequestHandler>(MovieNameController)),
            ...(fetchMiddlewares<RequestHandler>(MovieNameController.prototype.putMovieName)),

            function MovieNameController_putMovieName(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
                    request: {"in":"body","name":"request","required":true,"ref":"PutMovieNameRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new MovieNameController();


              const promise = controller.putMovieName.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/movie-name/:id',
            authenticateMiddleware([{"api_key":["contributor"]}]),
            ...(fetchMiddlewares<RequestHandler>(MovieNameController)),
            ...(fetchMiddlewares<RequestHandler>(MovieNameController.prototype.deleteMovieName)),

            function MovieNameController_deleteMovieName(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new MovieNameController();


              const promise = controller.deleteMovieName.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/search',
            authenticateMiddleware([{"api_key":["client"]}]),
            ...(fetchMiddlewares<RequestHandler>(SearchController)),
            ...(fetchMiddlewares<RequestHandler>(SearchController.prototype.search)),

            function SearchController_search(request: any, response: any, next: any) {
            const args = {
                    options: {"in":"body","name":"options","required":true,"ref":"SearchRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new SearchController();


              const promise = controller.search.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/security/permissions',
            authenticateMiddleware([{"api_key":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(SecurityController)),
            ...(fetchMiddlewares<RequestHandler>(SecurityController.prototype.getPermissions)),

            function SecurityController_getPermissions(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new SecurityController();


              const promise = controller.getPermissions.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/security/key/:key',
            authenticateMiddleware([{"api_key":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(SecurityController)),
            ...(fetchMiddlewares<RequestHandler>(SecurityController.prototype.getKey)),

            function SecurityController_getKey(request: any, response: any, next: any) {
            const args = {
                    key: {"in":"path","name":"key","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new SecurityController();


              const promise = controller.getKey.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/security/key/:key',
            authenticateMiddleware([{"api_key":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(SecurityController)),
            ...(fetchMiddlewares<RequestHandler>(SecurityController.prototype.deleteKey)),

            function SecurityController_deleteKey(request: any, response: any, next: any) {
            const args = {
                    key: {"in":"path","name":"key","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new SecurityController();


              const promise = controller.deleteKey.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/security/key/new',
            authenticateMiddleware([{"api_key":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(SecurityController)),
            ...(fetchMiddlewares<RequestHandler>(SecurityController.prototype.newKey)),

            function SecurityController_newKey(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"body","name":"request","required":true,"ref":"PostKeyRequest"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new SecurityController();


              const promise = controller.newKey.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/security/key',
            authenticateMiddleware([{"api_key":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(SecurityController)),
            ...(fetchMiddlewares<RequestHandler>(SecurityController.prototype.getKeys)),

            function SecurityController_getKeys(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new SecurityController();


              const promise = controller.getKeys.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/security/key/:key/permission/:permission',
            authenticateMiddleware([{"api_key":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(SecurityController)),
            ...(fetchMiddlewares<RequestHandler>(SecurityController.prototype.setPermission)),

            function SecurityController_setPermission(request: any, response: any, next: any) {
            const args = {
                    key: {"in":"path","name":"key","required":true,"dataType":"string"},
                    permission: {"in":"path","name":"permission","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new SecurityController();


              const promise = controller.setPermission.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/security/key/:key/permission/:permission',
            authenticateMiddleware([{"api_key":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(SecurityController)),
            ...(fetchMiddlewares<RequestHandler>(SecurityController.prototype.unsetPermission)),

            function SecurityController_unsetPermission(request: any, response: any, next: any) {
            const args = {
                    key: {"in":"path","name":"key","required":true,"dataType":"string"},
                    permission: {"in":"path","name":"permission","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new SecurityController();


              const promise = controller.unsetPermission.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
        return async function runAuthenticationMiddleware(request: any, _response: any, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            // keep track of failed auth attempts so we can hand back the most
            // recent one.  This behavior was previously existing so preserving it
            // here
            const failedAttempts: any[] = [];
            const pushAndRethrow = (error: any) => {
                failedAttempts.push(error);
                throw error;
            };

            const secMethodOrPromises: Promise<any>[] = [];
            for (const secMethod of security) {
                if (Object.keys(secMethod).length > 1) {
                    const secMethodAndPromises: Promise<any>[] = [];

                    for (const name in secMethod) {
                        secMethodAndPromises.push(
                            expressAuthentication(request, name, secMethod[name])
                                .catch(pushAndRethrow)
                        );
                    }

                    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                    secMethodOrPromises.push(Promise.all(secMethodAndPromises)
                        .then(users => { return users[0]; }));
                } else {
                    for (const name in secMethod) {
                        secMethodOrPromises.push(
                            expressAuthentication(request, name, secMethod[name])
                                .catch(pushAndRethrow)
                        );
                    }
                }
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            try {
                request['user'] = await promiseAny(secMethodOrPromises);
                next();
            }
            catch(err) {
                // Show most recent error as response
                const error = failedAttempts.pop();
                error.status = error.status || 401;
                next(error);
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function isController(object: any): object is Controller {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }

    function promiseHandler(controllerObj: any, promise: any, response: any, successStatus: any, next: any) {
        return Promise.resolve(promise)
            .then((data: any) => {
                let statusCode = successStatus;
                let headers;
                if (isController(controllerObj)) {
                    headers = controllerObj.getHeaders();
                    statusCode = controllerObj.getStatus() || statusCode;
                }

                // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                returnHandler(response, statusCode, data, headers)
            })
            .catch((error: any) => next(error));
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function returnHandler(response: any, statusCode?: number, data?: any, headers: any = {}) {
        if (response.headersSent) {
            return;
        }
        Object.keys(headers).forEach((name: string) => {
            response.set(name, headers[name]);
        });
        if (data && typeof data.pipe === 'function' && data.readable && typeof data._read === 'function') {
            data.pipe(response);
        } else if (data !== null && data !== undefined) {
            response.status(statusCode || 200).json(data);
        } else {
            response.status(statusCode || 204).end();
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function responder(response: any): TsoaResponse<HttpStatusCodeLiteral, unknown>  {
        return function(status, data, headers) {
            returnHandler(response, status, data, headers);
        };
    };

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function getValidatedArgs(args: any, request: any, response: any): any[] {
        const fieldErrors: FieldErrors  = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'path':
                    return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'header':
                    return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body':
                    return validationService.ValidateParam(args[key], request.body, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body-prop':
                    return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.', {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'formData':
                    if (args[key].dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.file, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    } else if (args[key].dataType === 'array' && args[key].array.dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.files, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    } else {
                        return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    }
                case 'res':
                    return responder(response);
            }
        });

        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidateError(fieldErrors, '');
        }
        return values;
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
