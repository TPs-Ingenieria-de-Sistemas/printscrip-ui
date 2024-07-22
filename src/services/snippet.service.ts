import { FileType } from "../types/FileType";
import { Rule } from "../types/Rule";
import { TestCase } from "../types/TestCase";
import { TestCaseResult } from "../utils/queries";
import { CreateSnippet, Snippet, UpdateSnippet } from "../utils/snippet";
import { SnippetOperations } from "../utils/snippetOperations";
import { PaginatedUsers } from "../utils/users";
import axiosInstance from "./axios";
import { FakeSnippetStore } from "../utils/mock/fakeSnippetStore";

const DELAY: number = 1000;
const BACK_URL = "https://dev-ingsis-group5.duckdns.org/snippets/";

export class SnippetService implements SnippetOperations {
  private readonly fakeStore = new FakeSnippetStore();

  listSnippetDescriptors(sippetName?: string): Promise<Snippet[]> {
    console.log(sippetName);
    return axiosInstance
      .get(`${BACK_URL}snippets/by_user`)
      .then((res) => res.data);
  }
  createSnippet(createSnippet: CreateSnippet): Promise<Snippet> {
    const createSnippetDTO = {
      name: createSnippet.name,
      content: createSnippet.content,
      language: createSnippet.language,
      extension: createSnippet.extension,
    };
    return axiosInstance
      .post(`${BACK_URL}snippets`, createSnippetDTO)
      .then((res) => res.data);
  }
  getSnippetById(id: string): Promise<Snippet | undefined> {
    return axiosInstance
      .get(`${BACK_URL}snippets/${id}`)
      .then((res) => res.data);
  }
  updateSnippetById(
    id: string,
    updateSnippet: UpdateSnippet
  ): Promise<Snippet> {
    return axiosInstance
      .put(`${BACK_URL}snippets/${id}`, updateSnippet)
      .then((res) => res.data);
  }
  getUserFriends(
    name?: string,
    page?: number,
    pageSize?: number
  ): Promise<PaginatedUsers> {
    console.log(name);
    console.log(page);
    console.log(pageSize);
    throw new Error("Method not implemented.");
  }
  shareSnippet(snippetId: string, userId: string): Promise<Snippet> {
    console.log(snippetId);
    console.log(userId);
    throw new Error("Method not implemented.");
  }
  async getFormatRules(): Promise<Rule[]> {
    const rules = await axiosInstance.get(
        `${BACK_URL}rules/user-rules?ruleType=FORMATTING`
      );
      if (rules.data.length === 0) {
        return new Promise((resolve) => {
          setTimeout(() => resolve(this.fakeStore.getLintingRules()), DELAY);
        });
      } else {
          return rules.data;
      }
  }
  async getLintingRules(): Promise<Rule[]> {
    const rules = await axiosInstance.get(
      `${BACK_URL}rules/user-rules?ruleType=LINTING`
    );
    if (rules.data.length === 0) {
      return new Promise((resolve) => {
        setTimeout(() => resolve(this.fakeStore.getLintingRules()), DELAY);
      });
    } else {
        return rules.data;
    }
  }
  getTestCases(id: string): Promise<TestCase[]> {
    return axiosInstance
      .get(`${BACK_URL}test-case/${id}`)
      .then((res) => res.data);
  }
  formatSnippet(snippet: string): Promise<string> {
    console.log(snippet);
    throw new Error("Method not implemented.");
  }
  postTestCase(id: string, testCase: Partial<TestCase>): Promise<TestCase> {
    return axiosInstance
      .post(`${BACK_URL}test-case/${id}`, testCase)
      .then((res) => res.data);
  }
  removeTestCase(id: string): Promise<string> {
    return axiosInstance
      .delete(`${BACK_URL}test-case/${id}`)
      .then((res) => res.data);
  }
  deleteSnippet(id: string): Promise<string> {
    return axiosInstance
      .delete(`${BACK_URL}snippets/${id}`)
      .then((res) => res.data);
  }
  testSnippet(testCase: Partial<TestCase>): Promise<TestCaseResult> {
    console.log(testCase);
    throw new Error("Method not implemented.");
  }
  getFileTypes(): Promise<FileType[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.fakeStore.getFileTypes()), DELAY);
    });
  }
  modifyFormatRule(newRules: Rule[]): Promise<Rule[]> {
    return axiosInstance
      .put(`${BACK_URL}rules/update-user-rules`, newRules)
      .then((res) => res.data);
  }
  modifyLintingRule(newRules: Rule[]): Promise<Rule[]> {
    return axiosInstance
      .put(`${BACK_URL}rules/update-user-rules`, newRules)
      .then((res) => res.data);
  }
}

export default SnippetService;
