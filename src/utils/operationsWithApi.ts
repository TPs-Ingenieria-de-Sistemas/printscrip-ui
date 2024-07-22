import autoBind from "auto-bind";
import { FileType } from "../types/FileType";
import { Rule } from "../types/Rule";
import { TestCase } from "../types/TestCase";
import { FakeSnippetOperations } from "./mock/fakeSnippetOperations";
import { TestCaseResult } from "./queries";
import { PaginatedSnippets, CreateSnippet, Snippet, UpdateSnippet } from "./snippet";
import { SnippetOperations } from "./snippetOperations";
import { PaginatedUsers } from "./users";
import axios from "axios";
import { BACKEND_URL } from "./constants";

const DELAY: number = 1000

export class OperationsWithAPI implements SnippetOperations {
    private readonly fake = new FakeSnippetOperations()

    constructor() {
        autoBind(this)
    }

    createSnippet(createSnippet: CreateSnippet): Promise<Snippet> {
        //TODO: add TOKEN BEARER
        return new Promise(resolve => {
            setTimeout(async () => {
                const response = await axios({
                    method: 'POST',
                    url: `${BACKEND_URL}/snippets/snippets`,
                    data: {name: createSnippet.name, content: createSnippet.content, languages: createSnippet.language}
                })
                resolve(response.data)
            }, DELAY)
        })
    }

    getSnippetById(id: string): Promise<Snippet | undefined> {
        //TODO: add TOKEN BEARER
        return new Promise(resolve => {
            setTimeout(async () => {
                const response = await axios({
                    method: 'GET',
                    url: `${BACKEND_URL}/snippets/snippets/${id}`
                })
                resolve(response.data)
            })
        })
    }

    listSnippetDescriptors(page: number, pageSize: number, sippetName?: string): Promise<PaginatedSnippets> {
        return this.fake.listSnippetDescriptors(page, pageSize)
    }

    updateSnippetById(id: string, updateSnippet: UpdateSnippet): Promise<Snippet> {
        return this.fake.updateSnippetById(id, updateSnippet)
    }

    getUserFriends(name?: string, page?: number, pageSize?: number): Promise<PaginatedUsers> {
        return this.fake.getUserFriends(name, page, pageSize)
    }

    shareSnippet(snippetId: string, userId: string): Promise<Snippet> {
        return this.fake.shareSnippet(snippetId)
    }

    getFormatRules(): Promise<Rule[]> {
        return this.fake.getFormatRules()
    }

    getLintingRules(): Promise<Rule[]> {
        return this.fake.getLintingRules()
    }

    getTestCases(): Promise<TestCase[]> {
        return this.fake.getTestCases()
    }

    formatSnippet(snippet: string): Promise<string> {
        return this.fake.formatSnippet(snippet);
    }

    postTestCase(testCase: Partial<TestCase>): Promise<TestCase> {
        return this.fake.postTestCase(testCase);
    }

    removeTestCase(id: string): Promise<string> {
        return this.fake.removeTestCase(id)
    }

    deleteSnippet(id: string): Promise<string> {
        return this.fake.deleteSnippet(id);
    }

    testSnippet(testCase: Partial<TestCase>): Promise<TestCaseResult> {
        return this.fake.testSnippet()
    }

    getFileTypes(): Promise<FileType[]> {
        return this.fake.getFileTypes()
    }

    modifyFormatRule(newRules: Rule[]): Promise<Rule[]> {
        return this.fake.modifyLintingRule(newRules)
    }

    modifyLintingRule(newRules: Rule[]): Promise<Rule[]> {
        return this.fake.modifyLintingRule(newRules)
    }
}