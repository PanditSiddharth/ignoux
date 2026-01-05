"use client"
import { IUser } from "@/modals/user.model";
import { getUserByUsername, getUsersFromServer } from "@/server-functions/user";
import { create } from "zustand";

interface UsersStore {
    users: IUser[];
    user: IUser;
    page: number;
    totalUsers: number;
    increasePage: () => void;
    getUsers(arg0: { username?: string, page: number, postsPerPage?: number, search?: string, searchBy?: string }, isInfiniteScroll?: boolean): Promise<void>;
    getUser: (username: string) => Promise<void | false>
    setUser: (user: IUser) => void
}
const useUsersStore = create<UsersStore>((set) => ({
    users: [],
    page: 1,
    totalUsers: 0,
    user: {} as IUser,
    getUser: async (username) => {
        try {
            const res = await getUserByUsername(username);
            if (!res) {
                set({ user: {} as IUser });
                return false;
            }
            set({ user: res });
        } catch (error) {
            console.error('Error fetching users:', error)
        }
    },
    getUsers: async (o, isInfiniteScroll = false) => {
        const skip = isInfiniteScroll ? (o.page - 1) * (o?.postsPerPage || 20) : 0;
        try {
            const skipPageData = JSON.parse(JSON.stringify({
                skip,
                postsPerPage: o.postsPerPage || 20, username: o.username,
                search: o.search, searchBy: o.searchBy
            }));
            const res = await getUsersFromServer(skipPageData);
            if (res) {
                const { usersRes, totalUsers } = res;
                set(() => ({ totalUsers }));
                if (!isInfiniteScroll)
                    set({ users: usersRes });
                else
                    set((state) => ({ users: [...state.users, ...usersRes] }));
            }
            else set({ users: [] });

        } catch (error) {
            console.error(error);
        }
    },
    increasePage: () => set((state) => ({ page: state.page + 1 })),
    setUser: (user) => set((state) => {
        let users = state.users
        users = users.map(old => old._id == user._id ? user : old)
        return { users }
    }),
}))


export default useUsersStore