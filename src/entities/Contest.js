"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contest = void 0;
class Contest {
    constructor({ id, name, type, phase, frozen, durationSeconds, startTimeSeconds, relativeTimeSeconds, kind, problems, classification, icpcRegion, country, city, season, preparedBy, websiteUrl, description, difficulty, }) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.phase = phase;
        this.frozen = frozen;
        this.durationSeconds = durationSeconds;
        this.startTimeSeconds = startTimeSeconds;
        this.relativeTimeSeconds = relativeTimeSeconds;
        this.kind = kind;
        this.icpcRegion = icpcRegion;
        this.country = country;
        this.city = city;
        this.season = season;
        this.problems = problems;
        this.classification = classification;
        this.preparedBy = preparedBy;
        this.websiteUrl = websiteUrl;
        this.description = description;
        this.difficulty = difficulty;
    }
}
exports.Contest = Contest;
