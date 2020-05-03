const MEMO_TYPES = {
    IMemoGroupService: Symbol.for("IMemoGroupService"),
    IMemoGroupRepository: Symbol.for("IMemoGroupRepository"),
    IMemoRepository: Symbol.for('IMemoRepository'),
    IMemoService: Symbol.for('IMemoService'),
    Translate: Symbol.for('Translate'),
    ITranslateService: Symbol.for('ITranslateService'),
}

export default MEMO_TYPES;