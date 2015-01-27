<?php

class AdminModel extends CI_Model
{

    /**
     * Update
     *
     * @param  string   $prize_id
     * @param  array   key value of img1
     *
     * @return boolean
     */
    public function setPrizeImage($prize_id, $images)
    {
        $sql  = 'UPDATE `prize` SET ';
        $sets = array();
        foreach ($images as $img_index => $md5) {
            $sets[] = sprintf('`%s`=UNHEX("%s")', $this->db->escape_str($img_index), $this->db->escape_str($md5));
        }
        $sql .= implode(', ', $sets);
        $this->db->query($sql);
    }

}
