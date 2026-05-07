/**
 * Standalone daemon entry point — spawned as a detached process by `opensigil start`
 */
import { runDaemon } from './daemon';

runDaemon().catch((err: Error) => {
  process.stderr.write(`OpenSigil daemon error: ${err.message}\n`);
  process.exit(1);
});
