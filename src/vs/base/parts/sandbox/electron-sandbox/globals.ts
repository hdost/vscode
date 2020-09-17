/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import type { ProcessMemoryInfo } from 'vs/base/parts/sandbox/common/electronTypes';
import { globals, INodeProcess } from 'vs/base/common/platform';

export const ipcRenderer = globals.vscode.ipcRenderer as {

	/**
	 * Listens to `channel`, when a new message arrives `listener` would be called with
	 * `listener(event, args...)`.
	 */
	on(channel: string, listener: (event: unknown, ...args: any[]) => void): void;

	/**
	 * Adds a one time `listener` function for the event. This `listener` is invoked
	 * only the next time a message is sent to `channel`, after which it is removed.
	 */
	once(channel: string, listener: (event: unknown, ...args: any[]) => void): void;

	/**
	 * Removes the specified `listener` from the listener array for the specified
	 * `channel`.
	 */
	removeListener(channel: string, listener: (event: unknown, ...args: any[]) => void): void;

	/**
	 * Send an asynchronous message to the main process via `channel`, along with
	 * arguments. Arguments will be serialized with the Structured Clone Algorithm,
	 * just like `postMessage`, so prototype chains will not be included. Sending
	 * Functions, Promises, Symbols, WeakMaps, or WeakSets will throw an exception.
	 *
	 * > **NOTE**: Sending non-standard JavaScript types such as DOM objects or special
	 * Electron objects is deprecated, and will begin throwing an exception starting
	 * with Electron 9.
	 *
	 * The main process handles it by listening for `channel` with the `ipcMain`
	 * module.
	 */
	send(channel: string, ...args: any[]): void;
};

export const webFrame = globals.vscode.webFrame as {

	/**
	 * Changes the zoom level to the specified level. The original size is 0 and each
	 * increment above or below represents zooming 20% larger or smaller to default
	 * limits of 300% and 50% of original size, respectively.
	 */
	setZoomLevel(level: number): void;
};

export const crashReporter = globals.vscode.crashReporter as {

	/**
	 * Set an extra parameter to be sent with the crash report. The values specified
	 * here will be sent in addition to any values set via the `extra` option when
	 * `start` was called.
	 *
	 * Parameters added in this fashion (or via the `extra` parameter to
	 * `crashReporter.start`) are specific to the calling process. Adding extra
	 * parameters in the main process will not cause those parameters to be sent along
	 * with crashes from renderer or other child processes. Similarly, adding extra
	 * parameters in a renderer process will not result in those parameters being sent
	 * with crashes that occur in other renderer processes or in the main process.
	 *
	 * **Note:** Parameters have limits on the length of the keys and values. Key names
	 * must be no longer than 39 bytes, and values must be no longer than 127 bytes.
	 * Keys with names longer than the maximum will be silently ignored. Key values
	 * longer than the maximum length will be truncated.
	 */
	addExtraParameter(key: string, value: string): void;
};

export const process = globals.vscode.process as INodeProcess & {

	/**
	 * The process.platform property returns a string identifying the operating system platform
	 * on which the Node.js process is running.
	 */
	platform: 'win32' | 'linux' | 'darwin';

	/**
	 * The type will always be Electron renderer.
	 */
	type: 'renderer';

	/**
	 * A list of versions for the current node.js/electron configuration.
	 */
	versions: { [key: string]: string | undefined };

	/**
	 * The process.env property returns an object containing the user environment.
	 */
	env: { [key: string]: string | undefined };

	/**
	 * The current working directory.
	 */
	cwd(): string;

	/**
	 * Returns the numeric user identity of the process.
	 */
	getuid(): number;

	/**
	 * Allows to await resolving the full process environment by checking for the shell environment
	 * of the OS in certain cases (e.g. when the app is started from the Dock on macOS).
	 */
	whenEnvResolved(): Promise<void>;

	/**
	 * Adds callback to the "next tick queue". This queue is fully drained
	 * after the current operation on the JavaScript stack runs to completion
	 * and before the event loop is allowed to continue.
	 */
	nextTick(callback: (...args: any[]) => void, ...args: any[]): void;

	/**
	 * A listener on the process. Only a small subset of listener types are allowed.
	 */
	on: (type: string, callback: Function) => void;

	/**
	 * Resolves with a ProcessMemoryInfo
	 *
	 * Returns an object giving memory usage statistics about the current process. Note
	 * that all statistics are reported in Kilobytes. This api should be called after
	 * app ready.
	 *
	 * Chromium does not provide `residentSet` value for macOS. This is because macOS
	 * performs in-memory compression of pages that haven't been recently used. As a
	 * result the resident set size value is not what one would expect. `private`
	 * memory is more representative of the actual pre-compression memory usage of the
	 * process on macOS.
	 */
	getProcessMemoryInfo: () => Promise<ProcessMemoryInfo>;
};

export const context = globals.vscode.context as {

	/**
	 * Wether the renderer runs with `sandbox` enabled or not.
	 */
	sandbox: boolean;
};
