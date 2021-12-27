// @ts-ignore
import {expr, obj, parse} from "./utils";
import * as ast from "../src/ast/ast";

describe('Parser: Map&Array', ()=> {

    test('map', ()=> {
        expect(obj(expr('{"a": "b", "c": 123}'))).toStrictEqual({
            entries: [
                {
                    key: {
                        position: {
                            column: 1,
                            line: 0,
                            offset: 1
                        },
                        raw: 'a',
                        type: 'LiteralExpression',
                        value: 'a'
                    },
                    value: {
                        position: {
                            column: 6,
                            line: 0,
                            offset: 6
                        },
                        raw: 'b',
                        type: 'LiteralExpression',
                        value: 'b'
                    }
                },
                {
                    key: {
                        position: {
                            column: 11,
                            line: 0,
                            offset: 11
                        },
                        raw: 'c',
                        type: 'LiteralExpression',
                        value: 'c'
                    },
                    value: {
                        position: {
                            column: 16,
                            line: 0,
                            offset: 16
                        },
                        raw: '123',
                        type: 'LiteralExpression',
                        value: 123
                    }
                }
            ],
            position: {
                column: 0,
                line: 0,
                offset: 0
            },
            type: 'MapExpression'
        });
    });


    test('array', ()=> {
        expect(obj(expr('[1,2]'))).toStrictEqual({
            elements: [
                {
                    position: {
                        column: 1,
                        line: 0,
                        offset: 1
                    },
                    raw: '1',
                    type: 'LiteralExpression',
                    value: 1
                },
                {
                    position: {
                        column: 3,
                        line: 0,
                        offset: 3
                    },
                    raw: '2',
                    type: 'LiteralExpression',
                    value: 2
                }
            ],
            position: {
                column: 0,
                line: 0,
                offset: 0
            },
            type: 'ArrayExpression'
        })
    });

    test('embed', ()=> {
        expect(obj(expr('[1,2, {"a":"b"}]'))).toStrictEqual({
            elements: [
                {
                    position: {
                        column: 1,
                        line: 0,
                        offset: 1
                    },
                    raw: '1',
                    type: 'LiteralExpression',
                    value: 1
                },
                {
                    position: {
                        column: 3,
                        line: 0,
                        offset: 3
                    },
                    raw: '2',
                    type: 'LiteralExpression',
                    value: 2
                },
                {
                    entries: [
                        {
                            key: {
                                position: {
                                    column: 7,
                                    line: 0,
                                    offset: 7
                                },
                                raw: 'a',
                                type: 'LiteralExpression',
                                value: 'a'
                            },
                            value: {
                                position: {
                                    column: 11,
                                    line: 0,
                                    offset: 11
                                },
                                raw: 'b',
                                type: 'LiteralExpression',
                                value: 'b'
                            }
                        }
                    ],
                    position: {
                        column: 6,
                        line: 0,
                        offset: 6
                    },
                    type: 'MapExpression'
                }
            ],
            position: {
                column: 0,
                line: 0,
                offset: 0
            },
            type: 'ArrayExpression'
        });
    });
});
