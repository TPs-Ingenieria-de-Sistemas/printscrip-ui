import { FileType } from "../types/FileType";
import { Rule } from "../types/Rule";
import { TestCase } from "../types/TestCase";
import { TestCaseResult } from "../utils/queries";
import { PaginatedSnippets, CreateSnippet, Snippet, UpdateSnippet } from "../utils/snippet";
import { SnippetOperations } from "../utils/snippetOperations";
import { PaginatedUsers } from "../utils/users";
import axiosInstance from "./axios";
import { FakeSnippetStore } from "../utils/mock/fakeSnippetStore";

const DELAY: number = 1000
const BACK_URL = "https://dev-ingsis-group5.duckdns.org/snippets/"

export class SnippetService implements SnippetOperations {
    private readonly fakeStore = new FakeSnippetStore()

    listSnippetDescriptors(_page: number, _pageSize: number, sippetName?: string): Promise<PaginatedSnippets> {
        return axiosInstance.get(`${BACK_URL}snippets/by_user/${sippetName}`).then((res) => res.data);
    }
    createSnippet(createSnippet: CreateSnippet): Promise<Snippet> {
        const createSnippetDTO = {
            userId : createSnippet.userId,
            name: createSnippet.name,
            content: createSnippet.content,
            language: createSnippet.language,
            extension: createSnippet.extension
        }
        console.log(BACK_URL)
        return axiosInstance.post(`${BACK_URL}snippets`, createSnippetDTO).then((res) => res.data);
    }
    getSnippetById(id: string): Promise<Snippet | undefined> {
        return axiosInstance.get(`${BACK_URL}snippets/${id}`).then((res) => res.data);
    }
    updateSnippetById(id: string, updateSnippet: UpdateSnippet): Promise<Snippet> {
        return axiosInstance.put(`${BACK_URL}snippets/${id}`, updateSnippet).then((res) => res.data);
    }
    getUserFriends(name?: string, page?: number, pageSize?: number): Promise<PaginatedUsers> {
        console.log(name)
        console.log(page)
        console.log(pageSize)
        throw new Error("Method not implemented.");
    }
    shareSnippet(snippetId: string, userId: string): Promise<Snippet> {
        console.log(snippetId)
        console.log(userId)
        throw new Error("Method not implemented.");
    }
    getFormatRules(): Promise<Rule[]> {
        return axiosInstance.get(`${BACK_URL}rules/user-rules?ruleType=FORMATTING`).then((res) => res.data);
    }
    getLintingRules(): Promise<Rule[]> {
        return axiosInstance.get(`${BACK_URL}rules/user-rules?ruleType=LINTING`).then((res) => res.data);
    }
    getTestCases(id: string): Promise<TestCase[]> {
        return axiosInstance.get(`${BACK_URL}test-case/${id}`).then((res) => res.data);
    }
    formatSnippet(snippet: string): Promise<string> {
        console.log(snippet)
        throw new Error("Method not implemented.");
    }
    postTestCase(id: string, testCase: Partial<TestCase>): Promise<TestCase> {
        return axiosInstance.post(`${BACK_URL}test-case/${id}`, testCase).then((res) => res.data);
    }
    removeTestCase(id: string): Promise<string> {
        return axiosInstance.delete(`${BACK_URL}test-case/${id}`).then((res) => res.data);
    }
    deleteSnippet(id: string): Promise<string> {
        return axiosInstance.delete(`${BACK_URL}snippets/${id}`).then((res) => res.data);
    }
    testSnippet(testCase: Partial<TestCase>): Promise<TestCaseResult> {
        console.log(testCase)
        throw new Error("Method not implemented.");
    }
    getFileTypes(): Promise<FileType[]> {
        return new Promise(resolve => {
            setTimeout(() => resolve(this.fakeStore.getFileTypes()), DELAY)
          })
    }
    modifyFormatRule(newRules: Rule[]): Promise<Rule[]> {
        return axiosInstance.put(`${BACK_URL}rules/update-user-rules`, newRules).then((res) => res.data);
    }
    modifyLintingRule(newRules: Rule[]): Promise<Rule[]> {
        return axiosInstance.put(`${BACK_URL}rules/update-user-rules`, newRules).then((res) => res.data);
    }
}

export default SnippetService;