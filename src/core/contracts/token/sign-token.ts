export abstract class SignTokenService {
	public abstract signToken<T extends object>(payload: T): Promise<string>;
}
