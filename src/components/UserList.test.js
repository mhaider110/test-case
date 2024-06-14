import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '../matchMedia';
import usersData from '../utils/default-user-data';
import UserList from './UserList';

test('Should display default list', () => {
    render(<UserList users={usersData} />);
    expect(screen.getByText((_, element) => element.textContent === 'Elon Musk')).toBeInTheDocument();
    expect(screen.getByText((_, element) => element.textContent === 'Bill Gates')).toBeInTheDocument();
    expect(screen.getByText((_, element) => element.textContent === 'Mark Zuckerberg')).toBeInTheDocument();
    expect(screen.getByText((_, element) => element.textContent === 'Sundar Pichai')).toBeInTheDocument();
    expect(screen.getByText((_, element) => element.textContent === 'Tim Cook')).toBeInTheDocument();
    expect(screen.getByText((_, element) => element.textContent === 'Satya Nadella')).toBeInTheDocument();
    expect(screen.getByText((_, element) => element.textContent === 'Jeff Bezos')).toBeInTheDocument();
});
test('Should delete user', () => {
    render(<UserList users={usersData} />);
    const deleteBtn = screen.getByTestId('delete1');
    fireEvent.click(deleteBtn);
    const yes = screen.getByText('Yes');
    fireEvent.click(yes);
    const users = screen.getByTestId('usersTable');
    expect(users.querySelectorAll('tr').length).toBe(7); // +1 for tr in the head
});
test('Should add user', async () => {
    render(<UserList users={usersData} />)

    const addNewButton = screen.getByTestId('addNewUser');
    await act(async () => fireEvent.click(addNewButton));

    const idField = screen.getByTestId('field-ID');
    fireEvent.change(idField, { target: { value: '123' } })

    const nameField = screen.getByTestId('field-name');
    fireEvent.change(nameField, { target: { value: 'TestName' } })

    const aboutField = screen.getByTestId('field-about');
    fireEvent.change(aboutField, { target: { value: 'Testing' } })

    const birthdayField = screen.getByTestId('field-dob');
    fireEvent.click(birthdayField);
    const date = screen.getByText('Today');
    fireEvent.click(date);

    const add = screen.getByTestId('addNow');
    await act(async () => {
        await fireEvent.click(add);
    });
    const users = screen.getByTestId('usersTable');
    expect(users.querySelectorAll('tr').length).toBe(9); // +1 for tr in the head
});

test('Should update user', async () => {
    render(<UserList users={usersData} />);
    const editBtn = screen.getByTestId('edit1');
    await act(async () => fireEvent.click(editBtn));

    const nameField = screen.getByTestId('field-name');
    fireEvent.change(nameField, { target: { value: 'TestName' } });

    const udpate = screen.getByTestId('addNow');
    await act(async () => {
        await fireEvent.click(udpate);
    });
    expect(screen.getByText((_, element) => element.textContent === 'TestName')).toBeInTheDocument();

});


