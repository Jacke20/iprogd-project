export class Loading {
    public loading: boolean;
    public loadings = [];
    constructor(val: boolean, tasks: number = 0) {
        this.loading = val;
        this.loadings.length = tasks;
    }
    /**
     * Start loading
     */
    standby() {
        this.loading = true;
    }
    /**
     * Loading finished
     */
    ready() {
        this.loading = false;
    }

    /**
     * Add loading task to loadings array
     * @param {boolean} task [description]
     */
    add_loading(index) {
        this.loadings[index] = true;
    }

    /**
     * Start all loading tasks in loadings array
     */
    loadings_standby() {
        for(let i = 0; i < this.loadings.length; i++) {
            this.loadings[i] = true;
        }
    }

    /**
     * Loading finished for one loading task in loadings
     * @param {[type]} index [description]
     */
    loading_ready(index) {
        this.loadings[index] = false;
    }

    /**
     * Check if all loading tasks are complete in loadings
     * @return {boolean} [description]
     */
    is_loading(): boolean {
        for(let i = 0; i < this.loadings.length; i++) {
            if(this.loadings[i]) { return true; }
        }
        return false;
    }


}
