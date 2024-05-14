import { v4 as uuidv4 } from 'uuid';

export const initialTitle = 'Insert title and Save';
export const initialValue = () => {
    const uuid: string = uuidv4();
    const uuid2: string = uuidv4();

    return JSON.stringify({
    [uuid] : {
      id: uuid,
      type: 'HeadingOne',
      meta: {
        order: 0,
        depth: 0,
      },
      value: [
        {
          id: uuid2,
          type: 'heading-one',
          children: [
            {
              text: initialTitle,
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
    }
})
}