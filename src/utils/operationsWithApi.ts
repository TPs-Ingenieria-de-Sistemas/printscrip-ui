import autoBind from "auto-bind";
import { FileType } from "../types/FileType";
import { Rule } from "../types/Rule";
import { TestCase } from "../types/TestCase";
import { FakeSnippetOperations } from "./mock/fakeSnippetOperations";
import { TestCaseResult } from "./queries";
import { PaginatedSnippets, CreateSnippet, Snippet, UpdateSnippet } from "./snippet";
import { SnippetOperations } from "./snippetOperations";
import { PaginatedUsers } from "./users";


export class OperationsWithAPI implements SnippetOperations {
    private readonly fake = new FakeSnippetOperations()

    constructor() {
        autoBind(this)
      }

    listSnippetDescriptors(page: number, pageSize: number, sippetName?: string): Promise<PaginatedSnippets> {
        return this.fake.listSnippetDescriptors(page, pageSize)
    }

    createSnippet(createSnippet: CreateSnippet): Promise<Snippet> {
        return this.fake.createSnippet(createSnippet)
    }

    getSnippetById(id: string): Promise<Snippet | undefined> {
        return this.fake.getSnippetById(id)
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