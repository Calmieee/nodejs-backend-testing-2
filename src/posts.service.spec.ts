import { PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;

  beforeEach(() => {
    postsService = new PostsService();
  });

  describe('.findMany', () => {
    const posts = [
      {text: 'Post 1'},
      {text: 'Post 2'},
      {text: 'Post 3'},
      {text: 'Post 4'},
    ];

    beforeEach(() => {
      posts.forEach((post) => postsService.create(post));
    });

    it('should return all posts if called without options', () => {
      const result = postsService.findMany();

      expect(result.map(({ text }) => ({ text }))).toEqual(posts);
    });

    it('should return correct posts for skip and limit options', () => {
      const result = postsService.findMany({ skip: 1, limit: 2});

      expect(result.map(({ text }) => ({ text }))).toEqual(posts.slice(1, 3));
    });

    it('should return last posts if skip is equal -1', () => {
      const result = postsService.findMany({ skip: -1 });

      expect(result.map(({ text }) => ({ text }))).toEqual(posts.slice(-1));
    });

    it('should return empty array if skip is equal to posts total count', () => {
      // реализуйте тест-кейс
      const result = postsService.findMany({ skip: posts.length });

      expect(result.map(({ text }) => ({ text }))).toEqual([]);
    });

    it('should return cutted posts if limit is less than 0', () => {
      const result = postsService.findMany({ limit: -1 });

      expect(result.map(({ text }) => ({ text }))).toEqual(posts.slice(0, -1));
    });
  });
});
