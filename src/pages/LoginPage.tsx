import "../index.css";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Checkbox } from '../components/ui/checkbox';
import { Alert, AlertDescription } from '../components/ui/alert';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Eye, EyeOff, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

// Validation schemas
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine(val => val === true, 'You must accept the terms and conditions'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginForm = z.infer<typeof loginSchema>;
type RegisterForm = z.infer<typeof registerSchema>;

export function LoginPage(){
    const navigate = useNavigate();
    const { login, register: registerUser } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [registerSuccess, setRegisterSuccess] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [registerError, setRegisterError] = useState('');

    const loginForm = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
    });

    const registerForm = useForm<RegisterForm>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            acceptTerms: false,
        },
    });

    const onLogin = async (data: LoginForm) => {
        setLoginError('');
        const success = await login(data.email, data.password, data.rememberMe);
        if (success) {
            setLoginSuccess(true);
            setTimeout(() => {
                setLoginSuccess(false);
                navigate('/');
            }, 2000);
        } else {
            setLoginError('Invalid email or password');
        }
    };

    const onRegister = async (data: RegisterForm) => {
        setRegisterError('');
        const success = await registerUser(data.name, data.email, data.password);
        if (success) {
            setRegisterSuccess(true);
            setTimeout(() => {
                setRegisterSuccess(false);
                navigate('/');
            }, 2000);
        } else {
            setRegisterError('Registration failed. Please try again.');
        }
    };

    const getPasswordStrength = (password: string) => {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[^a-zA-Z\d]/.test(password)) strength++;
        return strength;
    };

    const getPasswordStrengthText = (strength: number) => {
        if (strength <= 1) return { text: 'Weak', color: 'text-red-500' };
        if (strength <= 3) return { text: 'Medium', color: 'text-yellow-500' };
        return { text: 'Strong', color: 'text-green-500' };
    };

    const passwordStrength = getPasswordStrength(registerForm.watch('password'));
    const strengthInfo = getPasswordStrengthText(passwordStrength);

    return(
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md">
                <div className="mb-4">
                    <Button asChild variant="ghost">
                        <Link to="/">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Home
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl">Welcome to AdPlatform</CardTitle>
                        <p className="text-sm text-gray-600 mt-2">Sign in to your account or create a new one</p>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="login" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="login">Login</TabsTrigger>
                                <TabsTrigger value="register">Register</TabsTrigger>
                            </TabsList>

                            <TabsContent value="login" className="space-y-4">
                                <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
                                    <div>
                                        <Label htmlFor="login-email">Email</Label>
                                        <Input
                                            id="login-email"
                                            type="email"
                                            {...loginForm.register('email')}
                                            className={loginForm.formState.errors.email ? 'border-red-500' : ''}
                                        />
                                        {loginForm.formState.errors.email && (
                                            <p className="text-sm text-red-500 mt-1">{loginForm.formState.errors.email.message}</p>
                                        )}
                                    </div>
                                    <div>
                                        <Label htmlFor="login-password">Password</Label>
                                        <div className="relative">
                                            <Input
                                                id="login-password"
                                                type={showPassword ? 'text' : 'password'}
                                                {...loginForm.register('password')}
                                                className={loginForm.formState.errors.password ? 'border-red-500 pr-10' : 'pr-10'}
                                            />
                                            <button
                                                type="button"
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="h-4 w-4 text-gray-400" />
                                                ) : (
                                                    <Eye className="h-4 w-4 text-gray-400" />
                                                )}
                                            </button>
                                        </div>
                                        {loginForm.formState.errors.password && (
                                            <p className="text-sm text-red-500 mt-1">{loginForm.formState.errors.password.message}</p>
                                        )}
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="remember"
                                            {...loginForm.register('rememberMe')}
                                        />
                                        <Label htmlFor="remember" className="text-sm">Remember me</Label>
                                    </div>
                                    <Button
                                        type="submit"
                                        className="w-full"
                                        disabled={loginForm.formState.isSubmitting || loginSuccess}
                                    >
                                        {loginSuccess ? 'Logging in...' : 'Sign In'}
                                    </Button>
                                    <div className="text-center">
                                        <Button asChild variant="link" className="text-sm">
                                            <Link to="/forgot-password">Forgot your password?</Link>
                                        </Button>
                                    </div>
                                </form>
                            </TabsContent>

                            <TabsContent value="register" className="space-y-4">
                                <form onSubmit={registerForm.handleSubmit(onRegister)} className="space-y-4">
                                    <div>
                                        <Label htmlFor="register-name">Full Name</Label>
                                        <Input
                                            id="register-name"
                                            {...registerForm.register('name')}
                                            className={registerForm.formState.errors.name ? 'border-red-500' : ''}
                                        />
                                        {registerForm.formState.errors.name && (
                                            <p className="text-sm text-red-500 mt-1">{registerForm.formState.errors.name.message}</p>
                                        )}
                                    </div>
                                    <div>
                                        <Label htmlFor="register-email">Email</Label>
                                        <Input
                                            id="register-email"
                                            type="email"
                                            {...registerForm.register('email')}
                                            className={registerForm.formState.errors.email ? 'border-red-500' : ''}
                                        />
                                        {registerForm.formState.errors.email && (
                                            <p className="text-sm text-red-500 mt-1">{registerForm.formState.errors.email.message}</p>
                                        )}
                                    </div>
                                    <div>
                                        <Label htmlFor="register-password">Password</Label>
                                        <div className="relative">
                                            <Input
                                                id="register-password"
                                                type={showPassword ? 'text' : 'password'}
                                                {...registerForm.register('password')}
                                                className={registerForm.formState.errors.password ? 'border-red-500 pr-10' : 'pr-10'}
                                            />
                                            <button
                                                type="button"
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="h-4 w-4 text-gray-400" />
                                                ) : (
                                                    <Eye className="h-4 w-4 text-gray-400" />
                                                )}
                                            </button>
                                        </div>
                                        {registerForm.watch('password') && (
                                            <div className="mt-2">
                                                <div className="flex items-center justify-between text-xs">
                                                    <span>Password strength:</span>
                                                    <span className={strengthInfo.color}>{strengthInfo.text}</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                                    <div
                                                        className={`h-2 rounded-full transition-all ${
                                                            passwordStrength <= 1 ? 'bg-red-500' :
                                                            passwordStrength <= 3 ? 'bg-yellow-500' : 'bg-green-500'
                                                        }`}
                                                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                                                    ></div>
                                                </div>
                                                <div className="text-xs text-gray-500 mt-1 space-y-1">
                                                    <div className="flex items-center">
                                                        {registerForm.watch('password').length >= 8 ? (
                                                            <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                                                        ) : (
                                                            <XCircle className="h-3 w-3 text-red-500 mr-1" />
                                                        )}
                                                        At least 8 characters
                                                    </div>
                                                    <div className="flex items-center">
                                                        {/[a-z]/.test(registerForm.watch('password')) ? (
                                                            <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                                                        ) : (
                                                            <XCircle className="h-3 w-3 text-red-500 mr-1" />
                                                        )}
                                                        One lowercase letter
                                                    </div>
                                                    <div className="flex items-center">
                                                        {/[A-Z]/.test(registerForm.watch('password')) ? (
                                                            <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                                                        ) : (
                                                            <XCircle className="h-3 w-3 text-red-500 mr-1" />
                                                        )}
                                                        One uppercase letter
                                                    </div>
                                                    <div className="flex items-center">
                                                        {/\d/.test(registerForm.watch('password')) ? (
                                                            <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                                                        ) : (
                                                            <XCircle className="h-3 w-3 text-red-500 mr-1" />
                                                        )}
                                                        One number
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {registerForm.formState.errors.password && (
                                            <p className="text-sm text-red-500 mt-1">{registerForm.formState.errors.password.message}</p>
                                        )}
                                    </div>
                                    <div>
                                        <Label htmlFor="register-confirm-password">Confirm Password</Label>
                                        <div className="relative">
                                            <Input
                                                id="register-confirm-password"
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                {...registerForm.register('confirmPassword')}
                                                className={registerForm.formState.errors.confirmPassword ? 'border-red-500 pr-10' : 'pr-10'}
                                            />
                                            <button
                                                type="button"
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            >
                                                {showConfirmPassword ? (
                                                    <EyeOff className="h-4 w-4 text-gray-400" />
                                                ) : (
                                                    <Eye className="h-4 w-4 text-gray-400" />
                                                )}
                                            </button>
                                        </div>
                                        {registerForm.formState.errors.confirmPassword && (
                                            <p className="text-sm text-red-500 mt-1">{registerForm.formState.errors.confirmPassword.message}</p>
                                        )}
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="terms"
                                            {...registerForm.register('acceptTerms')}
                                            className={registerForm.formState.errors.acceptTerms ? 'border-red-500' : ''}
                                        />
                                        <Label htmlFor="terms" className="text-sm">
                                            I accept the{' '}
                                            <Button asChild variant="link" className="p-0 h-auto text-sm">
                                                <Link to="/terms">Terms and Conditions</Link>
                                            </Button>
                                            {' '}and{' '}
                                            <Button asChild variant="link" className="p-0 h-auto text-sm">
                                                <Link to="/privacy">Privacy Policy</Link>
                                            </Button>
                                        </Label>
                                    </div>
                                    {registerForm.formState.errors.acceptTerms && (
                                        <p className="text-sm text-red-500">{registerForm.formState.errors.acceptTerms.message}</p>
                                    )}
                                    <Button
                                        type="submit"
                                        className="w-full"
                                        disabled={registerForm.formState.isSubmitting || registerSuccess}
                                    >
                                        {registerSuccess ? 'Creating Account...' : 'Create Account'}
                                    </Button>
                                </form>
                            </TabsContent>
                        </Tabs>

                        {(loginSuccess || registerSuccess) && (
                            <Alert className="mt-4">
                                <CheckCircle className="h-4 w-4" />
                                <AlertDescription>
                                    {loginSuccess ? 'Login successful! Redirecting...' : 'Account created successfully! Redirecting...'}
                                </AlertDescription>
                            </Alert>
                        )}

                        {(loginError || registerError) && (
                            <Alert className="mt-4 border-red-200 bg-red-50">
                                <AlertCircle className="h-4 w-4 text-red-600" />
                                <AlertDescription className="text-red-800">
                                    {loginError || registerError}
                                </AlertDescription>
                            </Alert>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
export default LoginPage;