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
            }, DELAY)
        })
    }

    listSnippetDescriptors(page: number, pageSize: number, sippetName?: string): Promise<PaginatedSnippets> {
        return this.fake.listSnippetDescriptors(page, pageSize)
    }

    updateSnippetById(id: string, updateSnippet: UpdateSnippet): Promise<Snippet> {
        //TODO: add TOKEN BEARER
        return new Promise(resolve => {
            setTimeout(async () => {
                const response = await axios({
                    method: 'PUT',
                    url: `${BACKEND_URL}/snippets/snippets/${id}`,
                    data: {content: updateSnippet.content}
                })
                resolve(response.data)
            }, DELAY)

        })
    }

    getUserFriends(name?: string, page?: number, pageSize?: number): Promise<PaginatedUsers> {
        return this.fake.getUserFriends(name, page, pageSize)
    }

    shareSnippet(snippetId: string, userId: string): Promise<Snippet> {
        //TODO: add TOKEN BEARER
        return new Promise(resolve => {
            setTimeout(async () => {
                const spitedId = snippetId.split("/") 
                const fileName = spitedId.at(spitedId.length-1)
                const response = await axios({
                    method: 'POST',
                    url: `${BACKEND_URL}/snippets/share/${fileName}`,
                    data: {userId: userId, permissions: 4}
                })
                resolve(response.data)
            })
        })
    }

    getFormatRules(): Promise<Rule[]> {
        return this.fake.getFormatRules()
    }

    getLintingRules(): Promise<Rule[]> {
        return this.fake.getLintingRules()
    }

    formatSnippet(snippet: string): Promise<string> {
        return this.fake.formatSnippet(snippet);
    }

    getTestCases(snippetId: string): Promise<TestCase[]> {
        //TODO: add TOKEN BEARER
        return new Promise(resolve => {
            setTimeout(async () => {
                const response = await axios({
                    method: 'GET',
                    url: `${BACKEND_URL}/snippets/test-case/${snippetId}`
                })
                resolve(response.data)
            }, DELAY)
        })
    }

    postTestCase(snippetId: string, testCase: Partial<TestCase>): Promise<TestCase> {
        //TODO: add TOKEN BEARER
        return new Promise(resolve => {
            setTimeout(async () => {
                const response = await axios({
                    method: 'POST',
                    url: `${BACKEND_URL}/snippets/test-case/${snippetId}`,
                    data: {...testCase, testCaseName: testCase.name}
                })
                resolve(response.data)
            }, DELAY)
        })
    }

    removeTestCase(id: string): Promise<string> {
        //TODO: add TOKEN BEARER
        return new Promise(resolve => {
            setTimeout(async () => {
                const response = await axios({
                    method: 'DELETE',
                    url: `${BACKEND_URL}/snippets/test-case/${id}`,
                })
                resolve(response.data)
            }, DELAY)
        })
    }

    deleteSnippet(id: string): Promise<string> {
        return this.fake.deleteSnippet(id);
    }

    //??? WE ONLY GET TEST-ID and should be enought, but we ask for more in the API
    testSnippet(testCase: Partial<TestCase>): Promise<TestCaseResult> {
        return this.fake.testSnippet()
    }

    getFileTypes(): Promise<FileType[]> {
        return Promise.resolve([{language: 'printscript', extension: 'ps'}])
    }

    modifyFormatRule(newRules: Rule[]): Promise<Rule[]> {
        return this.fake.modifyLintingRule(newRules)
    }

    modifyLintingRule(newRules: Rule[]): Promise<Rule[]> {
        return this.fake.modifyLintingRule(newRules)
    }
}