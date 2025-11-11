import { create } from 'zustand'


type AuthState = {
    role: string | null
    isAuthenticated: boolean
    setRole: (r: string | null) => void
    logout: () => void
}


export const useAuth = create<AuthState>((set) => ({
    role: typeof window !== 'undefined' ? (document.cookie.match(/(^|;)\s*role=([^;]+)/)?.[2] ?? null) : null,
    isAuthenticated: typeof window !== 'undefined' ? !!document.cookie.match(/(^|;)\s*role=([^;]+)/) : false,
    setRole: (r) => {
        if (r) {
            document.cookie = `role=${r}; path=/; max-age=${60 * 60 * 24}; sameSite=lax`
            set({ role: r, isAuthenticated: true })
        } else {
            document.cookie = `role=; path=/; max-age=0; sameSite=lax`
            set({ role: null, isAuthenticated: false })
        }
    },
    logout: () => {
        document.cookie = `role=; path=/; max-age=0; sameSite=lax`
        set({ role: null, isAuthenticated: false })
    },
}))