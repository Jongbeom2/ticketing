export const natsWrapper = {
  client: {
    publish: jest
      .fn()
      .mockImplementation(
        (subject: string, data: string, calback: () => void) => {
          calback();
        }
      ),
  },
};
